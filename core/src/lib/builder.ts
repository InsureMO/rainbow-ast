import {Ast} from './ast';
import {
	MultiChoicesCaptor,
	TokenCaptor,
	TokenCaptorOrSelector,
	TokenCaptors,
	TokenCaptorSelector,
	TokenCaptureStatus
} from './captor';
import {AstBuildContext} from './context';
import {TokenPointcut} from './pointcut';
import {BlockToken, CompilationUnit, Token} from './token';
import {AstBuildStates, Language, LanguageAstBuildStates, LanguageTokenIds, TokenIds} from './types';

export type AstBuilderConstructOptions<
	T extends LanguageTokenIds = LanguageTokenIds,
	S extends LanguageAstBuildStates = LanguageAstBuildStates,
	L extends Language<T, S> = Language<T, S>
> = {
	verbose?: boolean;
	language: L;
}

/**
 * concurrent safety
 */
export class AstBuilder<
	T extends LanguageTokenIds = LanguageTokenIds,
	S extends LanguageAstBuildStates = LanguageAstBuildStates,
	L extends Language<T, S> = Language<T, S>,
	Opts extends AstBuilderConstructOptions<T, S, L> = AstBuilderConstructOptions<T, S, L>> {
	protected readonly _options: Required<Opts>;

	constructor(options: Opts) {
		this._options = this.initOptions(options);
	}

	/**
	 * assign default values, but only for optional properties of default options.
	 * extends builder and overwrite this method for customized options default values.
	 */
	protected initOptions(options: Opts): Required<Opts> {
		options.verbose = options.verbose ?? false;
		// @ts-expect-error for avoid the type check
		return options;
	}

	get options(): Required<Opts> {
		return this._options;
	}

	get verboseEnabled(): boolean {
		return this.options.verbose;
	}

	get language(): L {
		return this._options.language;
	}

	ast(document?: string): Ast {
		const cu = new CompilationUnit(document ?? '');
		this.parse(cu);
		return new Ast(cu);
	}

	protected findTokenCaptorsOfState(context: AstBuildContext<T, S, L>): TokenCaptors {
		const captors = this.language.captors[context.currentState];
		if (captors == null) {
			throw new Error(`Could not find captors for state[key=${context.currentState}, name=${this.language.states[context.currentState]}].`);
		}
		return captors;
	}

	protected doParse(cu: CompilationUnit): void {
		const context = new AstBuildContext<T, S, L>(cu, this.language);

		while (!context.eof) {
			const captors = this.findTokenCaptorsOfState(context);
			const [status] = captors.capture(context);
			if (status === TokenCaptureStatus.None) {
				// cannot capture token in current state,
				// back to parent
				if (context.isCompilationUnitBlock()) {
					throw new Error(`Cannot capture token from context, starts at char index[${context.charIndex}].`);
				} else {
					context.endCurrentBlock();
				}
			}
			// otherwise continue loop
		}
		context.endAllBlocks();
	}

	protected parse(compilationUnit: CompilationUnit): void {
		if (this.verboseEnabled) {
			const label = `Parse AST[chars=${(compilationUnit.text ?? '').length}]`;
			try {
				console.time(label);
				this.doParse(compilationUnit);
			} finally {
				console.timeEnd(label);
			}
		} else {
			this.doParse(compilationUnit);
		}
	}

	protected doStringify(token: Token, indent: string, lines: Array<string>): void {
		lines.push(indent + token.stringify(this.language.tokenIds));
		if (token instanceof BlockToken) {
			token.children.map(child => this.doStringify(child, indent + '\t', lines));
		}
	}

	stringify(token: Token): string {
		const lines: Array<string> = [];
		this.doStringify(token, '', lines);
		return lines.join('\n') + '\n';
	}

	printLanguage() {
		const {tokenIds, states, initState, tokenCapturePriorities, captors, pointcuts} = this.language;

		const lines: Array<string> = [];
		this.printTokenIds(lines, tokenIds);
		this.printAstBuildStates(lines, states, initState);
		this.printCaptors(lines, captors, states);
		{
			lines.push('# Token Capture Priority');
			lines.push('');
			Object.keys(tokenCapturePriorities)
				.map(stateName => stateName === '$Default' ? -1 : states[stateName])
				.sort()
				.forEach(state => {
					if (state === -1) {
						lines.push('## Default Token Priority');
					} else {
						lines.push(`## For state: \`${states[state]}\`(\`${state}\`)`);
					}
					lines.push('');
					const {
						lines: tokenLines, chars: tokenChars
					} = Object.keys(tokenCapturePriorities[state === -1 ? '$Default' : states[state]])
						.map(tokenName => tokenIds[tokenName])
						.sort()
						.reduce((rst, tokenId) => {
							const token = `\`${tokenIds[tokenId]}\`(\`${tokenId}\`)`;
							const priority = tokenCapturePriorities[state === -1 ? '$Default' : states[state]][tokenIds[tokenId]];
							rst.chars[0] = Math.max(rst.chars[0], token.length);
							rst.chars[1] = Math.max(rst.chars[1], `${priority}`.length);
							rst.lines.push([tokenId, priority]);
							return rst;
						}, {lines: [], chars: ['Token'.length, 'Capture Priority'.length]});
					lines.push(`| ${'Token'.padEnd(tokenChars[0], ' ')} | ${'Capture Priority'.padEnd(tokenChars[1], ' ')} |`);
					lines.push(`| ${''.padEnd(tokenChars[0], '-')} | ${''.padEnd(tokenChars[1], '-')} |`);
					tokenLines
						.sort(([id1, p1], [id2, p2]) => p1 === p2 ? (id1 - id2) : (p1 - p2))
						.forEach(([tokenId, priority]) => {
							const token = `\`${tokenIds[tokenId]}\`(\`${tokenId}\`)`;
							lines.push(`| ${token.padEnd(tokenChars[0], ' ')} | ${`${priority}`.padEnd(tokenChars[1], ' ')} |`);
						});
					lines.push('');
				});
		}
		this.printPointcuts(lines, pointcuts, tokenIds);

		console.log(lines.join('\n'));
	}

	private printPointcuts(lines: Array<string>, pointcuts: Record<number, TokenPointcut>, tokenIds: TokenIds) {
		lines.push('# Token Pointcuts');
		lines.push('');
		const {lines: pointcutLines, chars: pointcutChars} = Object.keys(pointcuts)
			.map(tokenId => Number(tokenId))
			.reduce((rst, tokenId) => {
				const token = `\`${tokenIds[tokenId]}\`(\`${tokenId}\`)`;
				rst.chars = Math.max(rst.chars, token.length);
				rst.lines.push(tokenId);
				return rst;
			}, {lines: [], chars: 'Token'.length});
		lines.push(`| ${'Token'.padEnd(pointcutChars, ' ')} |`);
		lines.push(`| ${''.padEnd(pointcutChars, '-')} |`);
		pointcutLines
			.sort()
			.forEach(tokenId => lines.push(`| ${`\`${tokenIds[tokenId]}\`(\`${tokenId}\`)`.padEnd(pointcutChars, ' ')} |`));
		lines.push('');
	}

	private printCaptors(lines: Array<string>, captors: Record<number, TokenCaptors>, states: AstBuildStates) {
		const toCaptors = (captors: Array<TokenCaptorOrSelector>): Array<TokenCaptor> => {
			return captors.map(cs => {
				if (cs instanceof TokenCaptor) {
					return [cs];
				} else if (cs instanceof MultiChoicesCaptor) {
					return cs.captors;
				} else {
					return captorsOfSelectors(cs);
				}
			}).flat();
		};
		const captorsOfSelectors = (selector: TokenCaptorSelector): Array<TokenCaptor> => {
			const {byCharCaptors: byChar, byFuncCaptors: byFunc, fallbackCaptor: fallback} = selector;
			return [
				...toCaptors([...byChar.values()]),
				...toCaptors([...byFunc.values()]),
				...toCaptors([fallback].filter(x => x != null))
			].filter(x => x != null);
		};
		lines.push('# Token Captors');
		lines.push('');
		Object.keys(captors)
			.map(state => Number(state))
			.sort()
			.forEach(state => {
				lines.push(`## For state: \`${states[state]}\`(\`${state}\`)`);
				lines.push('');
				const {lines: captorLines, chars: captorChars} = captorsOfSelectors(captors[state].selector)
					.sort((c1, c2) => c1.description.localeCompare(c2.description, (void 0), {sensitivity: 'base'}))
					.reduce((rst, captor) => {
						const token = `\`${captor.tokenName}\`(\`${captor.tokenId}\`)`;
						const rule = captor.description;
						rst.chars[0] = Math.max(rst.chars[0], token.length);
						rst.chars[1] = Math.max(rst.chars[1], rule.length);
						rst.lines.push([token, rule]);
						return rst;
					}, {lines: [], chars: ['Token'.length, 'Capture Rule'.length]});
				lines.push(`| ${'Token'.padEnd(captorChars[0], ' ')} | ${'Capture Rule'.padEnd(captorChars[1], ' ')} |`);
				lines.push(`| ${''.padEnd(captorChars[0], '-')} | ${''.padEnd(captorChars[1], '-')} |`);
				[...new Set(captorLines.map(([name, id]) => {
					return `| ${name.padEnd(captorChars[0], ' ')} | ${id.padEnd(captorChars[1], ' ')} |`;
				}))].forEach(line => lines.push(line));
				lines.push('');
			});
	}

	private printAstBuildStates(lines: Array<string>, states: AstBuildStates, initState: number) {
		lines.push('# AST Build States');
		lines.push('');
		lines.push(`Init state: \`${states[initState]}\`(\`${initState}\`)`);
		lines.push('');
		const {lines: stateLines, chars: stateChars} = Object.keys(states)
			.filter(state => isNaN(Number(state)))
			.reduce((rst, name) => {
				const id = `${states[name]}`;
				rst.chars[0] = Math.max(rst.chars[0], name.length);
				rst.chars[1] = Math.max(rst.chars[1], id.length);
				rst.lines.push([name, id]);
				return rst;
			}, {lines: [], chars: ['State Name'.length, 'State Id'.length]});
		lines.push(`| ${'State Name'.padEnd(stateChars[0], ' ')} | ${'State Id'.padEnd(stateChars[1], ' ')} |`);
		lines.push(`| ${''.padEnd(stateChars[0], '-')} | ${''.padEnd(stateChars[1], '-')} |`);
		stateLines.forEach(([name, id]) => {
			lines.push(`| ${name.padEnd(stateChars[0], ' ')} | ${id.padEnd(stateChars[1], ' ')} |`);
		});
		lines.push('');
	}

	private printTokenIds(lines: Array<string>, tokenIds: TokenIds) {
		lines.push('# Token Ids');
		lines.push('');
		const {lines: tokenIdLines, chars: tokenIdChars} = Object.keys(tokenIds)
			.filter(tokenId => isNaN(Number(tokenId)))
			.reduce((rst, name) => {
				const id = `${tokenIds[name]}`;
				rst.chars[0] = Math.max(rst.chars[0], name.length);
				rst.chars[1] = Math.max(rst.chars[1], id.length);
				rst.lines.push([name, id]);
				return rst;
			}, {lines: [], chars: ['Token Name'.length, 'Token Id'.length]});
		lines.push(`| ${'Token Name'.padEnd(tokenIdChars[0], ' ')} | ${'Token Id'.padEnd(tokenIdChars[1], ' ')} |`);
		lines.push(`| ${''.padEnd(tokenIdChars[0], '-')} | ${''.padEnd(tokenIdChars[1], '-')} |`);
		tokenIdLines.forEach(([name, id]) => {
			lines.push(`| ${name.padEnd(tokenIdChars[0], ' ')} | ${id.padEnd(tokenIdChars[1], ' ')} |`);
		});
		lines.push('');
	}
}