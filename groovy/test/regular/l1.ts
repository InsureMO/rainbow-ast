import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l1 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.Shebang, 0, 21, l.v, '#!/usr/bin/env groovy', [
			[T.ShebangStartMark, 0, 2, l.v, '#!'],
			[T.Slash, 2, 3, l.v, '/'],
			[T.Word, 3, 6, l.v, 'usr'],
			[T.Slash, 6, 7, l.v, '/'],
			[T.Word, 7, 10, l.v, 'bin'],
			[T.Slash, 10, 11, l.v, '/'],
			[T.Word, 11, 14, l.v, 'env'],
			[T.Whitespaces, 14, 15, l.v, ' '],
			[T.Word, 15, 21, l.v, 'groovy']
		]],
		[T.Newline, 21, 22, l.v++, '\n']
	];
};
