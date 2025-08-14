import {AtomicToken, Char} from '@rainbow-ast/core';
import {JCM} from '@rainbow-ast/java-base';
import {ParseContext} from '../parse-context';
import {ByCharTokenParser} from '../token-parser';
import {GroovyTokenId, T} from '../tokens';

export class OperatorParser extends ByCharTokenParser {
	private readonly _keyword: string;
	private readonly _restChars: string;
	private readonly _tokenId: GroovyTokenId;

	constructor(keyword: string, tokenId: GroovyTokenId) {
		super(keyword[0]);
		this._keyword = keyword;
		this._restChars = keyword.slice(1);
		this._tokenId = tokenId;
	}

	// noinspection JSUnusedGlobalSymbols
	get keyword(): string {
		return this._keyword;
	}

	// noinspection JSUnusedGlobalSymbols
	get restChars(): string {
		return this._restChars;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	matches(_1: Char, context: ParseContext): boolean {
		const restCharsLength = this._restChars.length;
		if (restCharsLength === 0) {
			return true;
		}
		const [chars, charAfter] = context.nextChars(restCharsLength);
		if (chars !== this._restChars) {
			return false;
		}
		if ([T.In, T.NotIn, T.InstanceOf, T.NotInstanceOf].includes(this._tokenId)) {
			return !JCM.JNamePart(charAfter);
		} else {
			return true;
		}
	}

	// noinspection JSUnusedGlobalSymbols
	protected getTokenId(): GroovyTokenId {
		return this._tokenId;
	}

	protected createToken(context: ParseContext): AtomicToken {
		const charIndex = context.charIndex;
		return new AtomicToken({
			id: this._tokenId,
			text: this._keyword,
			start: charIndex, line: context.line, column: context.column
		});
	}

	protected collectToken(context: ParseContext): boolean {
		context.collect(this.createToken(context));
		context.forward(this._keyword.length);
		return true;
	}

	parse(_: Char, context: ParseContext): boolean {
		return this.collectToken(context);
	}
}

export const OperatorParsers = ([
	['..', T.RangeInclusive],
	['<..', T.RangeExclusiveLeft],
	['..<', T.RangeExclusiveRight],
	['<..<', T.RangeExclusiveFull],
	['*.', T.SpreadDot],
	['?.', T.SafeDot],
	['?[', T.SafeIndex],
	[']', T.SafeIndexClose],
	['??.', T.SafeChainDot],
	['?:', T.Elvis],
	['.&', T.MethodPointer],
	['::', T.MethodReference],
	['=~', T.RegexFind],
	['==~', T.RegexMatch],
	['**', T.Power],
	['**=', T.PowerAssign],
	['<=>', T.Spaceship],
	['===', T.Identical],
	['!==', T.NotIdentical],
	['->', T.Arrow],
	['in', T.In],
	['!in', T.NotIn],
	['!instanceof', T.NotInstanceOf],
	// Java Operators
	['=', T.Assign],
	['>', T.GreaterThan],
	['<', T.LessThan],
	['!', T.Not],
	['~', T.Bitnot],
	['?', T.Question],
	[':', T.Colon],
	['==', T.Equal],
	['<=', T.LessThanOrEqual],
	['>=', T.GreaterThanOrEqual],
	['!=', T.NotEqual],
	['&&', T.And],
	['||', T.Or],
	['++', T.Increase],
	['--', T.Decrease],
	['+', T.Add],
	['-', T.Subtract],
	['*', T.Multiple],
	['/', T.Divide],
	['&', T.Bitand],
	['|', T.Bitor],
	['^', T.Xor],
	['%', T.Mod],
	['<<', T.Lshift],
	['>>', T.Rshift],
	['>>>', T.Urshift],
	['+=', T.AddAssign],
	['-=', T.SubtractAssign],
	['*=', T.MultipleAssign],
	['/=', T.DivideAssign],
	['&=', T.BitandAssign],
	['|=', T.BitorAssign],
	['^=', T.XorAssign],
	['%=', T.ModAssign],
	['<<=', T.LshiftAssign],
	['>>=', T.RshiftAssign],
	['>>>=', T.UrshiftAssign],
	['?=', T.ElvisAssign],
	['...', T.Ellipsis],
	['instanceof', T.InstanceOf]
] as Array<[string, GroovyTokenId]>)
	.sort(([t1], [t2]) => (t1.length - t2.length) * -1)
	.map(([char, tokenId]) => new OperatorParser(char, tokenId));

export const AssignParserInstance = OperatorParsers.find(p => p.keyword === '=');
