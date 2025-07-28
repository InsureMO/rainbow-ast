import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l4_5 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.MLComment, 70, 75, l.v, '/*\n*/', [
			[T.MLCommentStartMark, 70, 72, l.v, '/*'],
			[T.Newline, 72, 73, l.v++, '\n'],
			[T.MLCommentEndMark, 73, 75, l.v, '*/']
		]],
		[T.Newline, 75, 76, l.v++, '\n']
	];
};
