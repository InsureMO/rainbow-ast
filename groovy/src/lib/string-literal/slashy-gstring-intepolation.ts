import {Char} from '@rainbow-ast/core';
import {ParseContext} from '../parse-context';
import {GsBraceInterpolationParser, GsInterpolationParser, ICM} from './gstring-intepolation';

export class SGsInterpolationParser extends GsInterpolationParser {
	matches(_: Char, context: ParseContext): boolean {
		return ICM.INameStart(context.nextChar());
	}

	static readonly instance = new SGsInterpolationParser();
}

export class SGsBraceInterpolationParser extends GsBraceInterpolationParser {
	static readonly instance = new SGsBraceInterpolationParser();
}
