import {DGP, T} from '../../src';
import {AstChecker} from '../utils';

describe('Regular test', () => {
	test('Annotation: Simple #1', async () => {
		const text = '  \t\t';
		const ast = DGP.parse(text, {shebang: true});
		AstChecker.check(ast, [T.CompilationUnit, 0, text.length, 1, text, [
			[T.Whitespaces, 0, 2, 1, '  '],
			[T.Tabs, 2, 4, 1, '\t\t']
		]]);
	});
});
