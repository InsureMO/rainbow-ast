import {T} from '../../src';
import {TokenSpec} from '../utils';

export const l2 = (l: { v: number }): Array<TokenSpec> => {
	return [
		[T.Whitespaces, 22, 24, l.v, '  '],
		[T.Tabs, 24, 26, l.v, '\t\t'],
		[T.UndeterminedChar, 26, 27, l.v, '#'],
		[T.Newline, 27, 28, l.v++, '\n']
	];
};
