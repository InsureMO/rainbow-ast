import {Char} from '@rainbow-ast/core';
import {RBraceParserInstance} from '../../common-token';
import {ParseContext} from '../../parse-context';
import {ParserSelector, ParserSelectorArgs} from '../../token-parser';
import {GroovyTokenId, T} from '../../tokens';
import {CodeBlockParser} from './code-block-parser';

/**
 * TODO some special token parser rules for type body:
 *  - identifier starts method/field
 *  - generic type starts method/field
 *  in a word, no expression started in type body.
 */
export class TypeBodyParser extends CodeBlockParser {
	protected static Selector: ParserSelector;

	static initSelector(parsers: ParserSelectorArgs['parsers']) {
		if (TypeBodyParser.Selector != null) {
			throw new Error('TypeBodyParser.Selector is initialized.');
		}
		TypeBodyParser.Selector = new ParserSelector({
			parsers: [RBraceParserInstance, ...parsers]
		});
	}

	constructor() {
		super(T.TypeBody);
	}

	protected getTokenId(): GroovyTokenId {
		return T.LBrace;
	}

	protected getInitBlockParserSelector(): ParserSelector {
		return TypeBodyParser.Selector;
	}

	parse(ch: Char, context: ParseContext): boolean {
		return this.parseAsBlock(ch, context);
	}

	static readonly instance = new TypeBodyParser();
}
