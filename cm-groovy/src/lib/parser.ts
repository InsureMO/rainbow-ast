import {Input, NodeSet as LezerNodeSet, NodeType, Parser, PartialParse, Tree} from '@lezer/common';
import {Token} from '@rainbow-ast/core';
import {GroovyTokenId} from '@rainbow-ast/groovy';
import {GroovyFacetDocument} from './facet-document';
import {GroovyLanguageServer, GroovyLanguageServerArgs} from './language-server';

interface CmToken {
	id: GroovyTokenId;
	name: string;
	top?: boolean;
}

// key is value of enumeration, according to typescript standard
const createCmTokens = (): { [key in Exclude<keyof typeof GroovyTokenId, number>]: CmToken } => {
	return Object.keys(GroovyTokenId).reduce((ret, key) => {
		if ('0123456789'.includes(`${key}`[0])) {
			// keys are indexes and names
			// ignore index keys and temporary token keys
			return ret;
		}
		ret[key] = {id: GroovyTokenId[key], name: key};
		if (ret[key].id === GroovyTokenId.CompilationUnit) {
			ret[key].top = true;
		}
		return ret;
	}, {} as { [key in Exclude<keyof typeof GroovyTokenId, number>]: CmToken });
};
const transpileTokenToNodeTypes = (): Array<NodeType> => {
	const cmTokens = createCmTokens();
	const tokens = Object.values(cmTokens);
	const types: Array<NodeType> = new Array(tokens.length).fill(null);
	tokens.forEach(token => types[token.id] = NodeType.define(token));
	const notDefined: Array<number> = [];
	const incorrectIndexes: Array<{ def: NodeType, index: number }> = [];
	types.forEach((type, index) => {
		if (type == null) {
			notDefined.push(index);
		} else if (type.id !== index) {
			incorrectIndexes.push({def: type, index});
		}
	});
	const error: Array<string> = [];
	if (notDefined.length !== 0) {
		error.push(`not defined[${notDefined.join(', ')}]`);
	}
	if (incorrectIndexes.length !== 0) {
		error.push(`mismatched[${incorrectIndexes.map(({def, index}) => {
			return `[defId=${def.id}, defName=${def.name}, index=${index}, expect=${cmTokens[index]?.name ?? 'TBD'}]`;
		}).join(', ')}]`);
	}
	if (error.length !== 0) {
		throw new Error(`Error occurred in node type definition, ${error.join(', ')}.`);
	}
	return types;
};
const createLezerNodeSet = () => {
	return new LezerNodeSet(transpileTokenToNodeTypes());
};
const NodeSet = createLezerNodeSet();

type Fragments = Parameters<Parser['createParse']>[1];
type Ranges = Parameters<Parser['createParse']>[2];

export interface GroovyParserArgs extends GroovyLanguageServerArgs {
	document: GroovyFacetDocument;
}

export class GroovyParser extends Parser {
	static readonly DEFAULT_NODE_GROUP_SIZE: number = 4;
	private readonly _document: GroovyFacetDocument;
	private readonly _languageServer: GroovyLanguageServer;

	constructor(options?: GroovyParserArgs) {
		super();
		const {document, ...rest} = options;
		this._document = document;
		this._languageServer = new GroovyLanguageServer(rest);
	}

	get document(): GroovyFacetDocument {
		return this._document;
	}

	get languageServer(): GroovyLanguageServer {
		return this._languageServer;
	}

	createParse(input: Input, fragments: Fragments, ranges: Ranges): PartialParse {
		return this.startParse(input, fragments, ranges);
	}

	private createBufferFromTokens(nodes: ReadonlyArray<Token>): Array<number> {
		const buffer: Array<number> = [];

		nodes.forEach((node) => {
			const nodeTypeId = node.id;
			const startOffset = node.start;
			const endOffset = node.end;

			buffer.push(nodeTypeId, startOffset, endOffset, GroovyParser.DEFAULT_NODE_GROUP_SIZE);
		});

		const topNodeId = GroovyTokenId.CompilationUnit;
		const startOffset = nodes[0].start;
		const endOffset = nodes[nodes.length - 1].end;
		const topNodeSize = nodes.length * GroovyParser.DEFAULT_NODE_GROUP_SIZE + GroovyParser.DEFAULT_NODE_GROUP_SIZE;

		buffer.push(topNodeId, startOffset, endOffset, topNodeSize);

		// console.log(buffer);
		return buffer;
	}

	private buildTree(document: string): Tree {
		const ast = this.languageServer.parse(document);
		// cache, copy to facet data
		this.document.install(ast);
		const nodes = this.document.atomicTokens();

		if (nodes.length < 1) {
			return Tree.build({
				buffer: [
					GroovyTokenId.CompilationUnit,
					0,
					document.length,
					GroovyParser.DEFAULT_NODE_GROUP_SIZE
				],
				nodeSet: NodeSet,
				topID: GroovyTokenId.CompilationUnit
			});
		} else {
			return Tree.build({
				buffer: this.createBufferFromTokens(nodes),
				nodeSet: NodeSet,
				topID: GroovyTokenId.CompilationUnit
			});
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	startParse(input: string | Input, _fragments: Fragments, _ranges: Ranges): PartialParse {
		const document = typeof input === 'string' ? input : input.read(0, input.length);

		const tree = this.buildTree(document);

		return {
			stoppedAt: input.length,
			parsedPos: input.length,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			stopAt: (_) => {
			},
			advance: () => {
				return tree;
			}
		};
	}
}
