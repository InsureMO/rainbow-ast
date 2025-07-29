import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l4_5 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.MLComment, 70, l.v, '/*\n*/', [
			[T.MLCommentStartMark, 70, l.v, '/*'],
			[T.Newline, 72, l.v++, '\n'],
			[T.MLCommentEndMark, 73, l.v, '*/']
		]],
		[T.Newline, 75, l.v++, '\n']
	];
};
