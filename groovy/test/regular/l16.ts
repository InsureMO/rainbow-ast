import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l16 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.SLComment, 142, l.v, '// string test', [
			[T.SLCommentStartMark, 142, l.v, '//'],
			[T.Whitespaces, 144, l.v, ' '],
			[T.Word, 145, l.v, 'string'],
			[T.Whitespaces, 151, l.v, ' '],
			[T.Word, 152, l.v, 'test']
		]],
		[T.Newline, 156, l.v++, '\n']
	];
};
