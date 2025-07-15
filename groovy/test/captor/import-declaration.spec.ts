import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Import Declaration', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Import Declaration: Simple #1', async () => {
		const ast = builder.ast('import');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, 'import', [
			[GroovyTokenId.ImportDecl, 0, 6, 1, 'import', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import']
			]]
		]]);
	});
	test('Import Declaration: Simple #2', async () => {
		const ast = builder.ast('import java.util');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 16, 1, 'import java.util', [
			[GroovyTokenId.ImportDecl, 0, 16, 1, 'import java.util', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 11, 1, 'java'],
				[GroovyTokenId.Dot, 11, 12, 1, '.'],
				[GroovyTokenId.Identifier, 12, 16, 1, 'util']
			]]
		]]);
	});
	test('Import Declaration: Simple #3', async () => {
		const ast = builder.ast('import java.util\n');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 17, 1, 'import java.util\n', [
			[GroovyTokenId.ImportDecl, 0, 16, 1, 'import java.util', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 11, 1, 'java'],
				[GroovyTokenId.Dot, 11, 12, 1, '.'],
				[GroovyTokenId.Identifier, 12, 16, 1, 'util']
			]],
			[GroovyTokenId.Newline, 16, 17, 1, '\n']
		]]);
	});
	test('Import Declaration: Simple #4', async () => {
		const ast = builder.ast('import java.util; ');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 18, 1, 'import java.util; ', [
			[GroovyTokenId.ImportDecl, 0, 17, 1, 'import java.util;', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 11, 1, 'java'],
				[GroovyTokenId.Dot, 11, 12, 1, '.'],
				[GroovyTokenId.Identifier, 12, 16, 1, 'util'],
				[GroovyTokenId.Semicolon, 16, 17, 1, ';']
			]],
			[GroovyTokenId.Whitespaces, 17, 18, 1, ' ']
		]]);
	});
	test('Import Declaration: Static', async () => {
		const ast = builder.ast('import static java.util');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 23, 1, 'import static java.util', [
			[GroovyTokenId.ImportDecl, 0, 23, 1, 'import static java.util', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.STATIC, 7, 13, 1, 'static'],
				[GroovyTokenId.Whitespaces, 13, 14, 1, ' '],
				[GroovyTokenId.Identifier, 14, 18, 1, 'java'],
				[GroovyTokenId.Dot, 18, 19, 1, '.'],
				[GroovyTokenId.Identifier, 19, 23, 1, 'util']
			]]
		]]);
	});
	test('Import Declaration: Asterisk', async () => {
		const ast = builder.ast('import java.util.*');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 18, 1, 'import java.util.*', [
			[GroovyTokenId.ImportDecl, 0, 18, 1, 'import java.util.*', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 11, 1, 'java'],
				[GroovyTokenId.Dot, 11, 12, 1, '.'],
				[GroovyTokenId.Identifier, 12, 16, 1, 'util'],
				[GroovyTokenId.Dot, 16, 17, 1, '.'],
				[GroovyTokenId.Multiple, 17, 18, 1, '*']
			]]
		]]);
	});
	test('Import Declaration: Alias', async () => {
		const ast = builder.ast('import java.lang.Integer as Int');
		// noinspection DuplicatedCode
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 31, 1, 'import java.lang.Integer as Int', [
			[GroovyTokenId.ImportDecl, 0, 31, 1, 'import java.lang.Integer as Int', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 11, 1, 'java'],
				[GroovyTokenId.Dot, 11, 12, 1, '.'],
				[GroovyTokenId.Identifier, 12, 16, 1, 'lang'],
				[GroovyTokenId.Dot, 16, 17, 1, '.'],
				[GroovyTokenId.Identifier, 17, 24, 1, 'Integer'],
				[GroovyTokenId.Whitespaces, 24, 25, 1, ' '],
				[GroovyTokenId.AS, 25, 27, 1, 'as'],
				[GroovyTokenId.Whitespaces, 27, 28, 1, ' '],
				[GroovyTokenId.Identifier, 28, 31, 1, 'Int']
			]]
		]]);
	});
	test('Import Declaration: Continuous dots', async () => {
		const ast = builder.ast('import java..util');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 17, 1, 'import java..util', [
			[GroovyTokenId.ImportDecl, 0, 12, 1, 'import java.', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 11, 1, 'java'],
				[GroovyTokenId.Dot, 11, 12, 1, '.']
			]],
			[GroovyTokenId.Dot, 12, 13, 1, '.'],
			[GroovyTokenId.Identifier, 13, 17, 1, 'util']
		]]);
	});
	test('Import Declaration: Continuous statics', async () => {
		const ast = builder.ast('import static static');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 20, 1, 'import static static', [
			[GroovyTokenId.ImportDecl, 0, 14, 1, 'import static ', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.STATIC, 7, 13, 1, 'static'],
				[GroovyTokenId.Whitespaces, 13, 14, 1, ' ']
			]],
			[GroovyTokenId.STATIC, 14, 20, 1, 'static']
		]]);
	});
	test('Import Declaration: Static and dot', async () => {
		const ast = builder.ast('import static .');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 15, 1, 'import static .', [
			[GroovyTokenId.ImportDecl, 0, 14, 1, 'import static ', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.STATIC, 7, 13, 1, 'static'],
				[GroovyTokenId.Whitespaces, 13, 14, 1, ' ']
			]],
			[GroovyTokenId.Dot, 14, 15, 1, '.']
		]]);
	});
	test('Import Declaration: Continuous identifiers', async () => {
		const ast = builder.ast('import java util');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 16, 1, 'import java util', [
			[GroovyTokenId.ImportDecl, 0, 12, 1, 'import java ', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 11, 1, 'java'],
				[GroovyTokenId.Whitespaces, 11, 12, 1, ' ']
			]],
			[GroovyTokenId.Identifier, 12, 16, 1, 'util']
		]]);
	});
	test('Import Declaration: Identifiable keywords', async () => {
		const ast = builder.ast('import as.def.var.record.sealed.permits.yield.in');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 48, 1, 'import as.def.var.record.sealed.permits.yield.in', [
			[GroovyTokenId.ImportDecl, 0, 48, 1, 'import as.def.var.record.sealed.permits.yield.in', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 9, 1, 'as'],
				[GroovyTokenId.Dot, 9, 10, 1, '.'],
				[GroovyTokenId.Identifier, 10, 13, 1, 'def'],
				[GroovyTokenId.Dot, 13, 14, 1, '.'],
				[GroovyTokenId.Identifier, 14, 17, 1, 'var'],
				[GroovyTokenId.Dot, 17, 18, 1, '.'],
				[GroovyTokenId.Identifier, 18, 24, 1, 'record'],
				[GroovyTokenId.Dot, 24, 25, 1, '.'],
				[GroovyTokenId.Identifier, 25, 31, 1, 'sealed'],
				[GroovyTokenId.Dot, 31, 32, 1, '.'],
				[GroovyTokenId.Identifier, 32, 39, 1, 'permits'],
				[GroovyTokenId.Dot, 39, 40, 1, '.'],
				[GroovyTokenId.Identifier, 40, 45, 1, 'yield'],
				[GroovyTokenId.Dot, 45, 46, 1, '.'],
				[GroovyTokenId.Identifier, 46, 48, 1, 'in']
			]]
		]]);
	});
	test('Import Declaration: Keyword', async () => {
		const ast = builder.ast('import as.import');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 16, 1, 'import as.import', [
			[GroovyTokenId.ImportDecl, 0, 10, 1, 'import as.', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 9, 1, 'as'],
				[GroovyTokenId.Dot, 9, 10, 1, '.']
			]],
			[GroovyTokenId.ImportDecl, 10, 16, 1, 'import', [
				[GroovyTokenId.IMPORT, 10, 16, 1, 'import']
			]]
		]]);
	});
	test('Import Declaration: Keyword non-sealed', async () => {
		const ast = builder.ast('import as.non-sealed');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 20, 1, 'import as.non-sealed', [
			[GroovyTokenId.ImportDecl, 0, 10, 1, 'import as.', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 9, 1, 'as'],
				[GroovyTokenId.Dot, 9, 10, 1, '.']
			]],
			[GroovyTokenId.NON_SEALED, 10, 20, 1, 'non-sealed']
		]]);
	});
	test('Import Declaration: Continuous as', async () => {
		const ast = builder.ast('import java.lang.Integer as as');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 30, 1, 'import java.lang.Integer as as', [
			[GroovyTokenId.ImportDecl, 0, 30, 1, 'import java.lang.Integer as as', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 11, 1, 'java'],
				[GroovyTokenId.Dot, 11, 12, 1, '.'],
				[GroovyTokenId.Identifier, 12, 16, 1, 'lang'],
				[GroovyTokenId.Dot, 16, 17, 1, '.'],
				[GroovyTokenId.Identifier, 17, 24, 1, 'Integer'],
				[GroovyTokenId.Whitespaces, 24, 25, 1, ' '],
				[GroovyTokenId.AS, 25, 27, 1, 'as'],
				[GroovyTokenId.Whitespaces, 27, 28, 1, ' '],
				[GroovyTokenId.AS, 28, 30, 1, 'as']
			]]
		]]);
	});
	test('Import Declaration: Continuous as identifiers', async () => {
		const ast = builder.ast('import java.lang.Integer as Int Int');
		// noinspection DuplicatedCode
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 35, 1, 'import java.lang.Integer as Int Int', [
			[GroovyTokenId.ImportDecl, 0, 31, 1, 'import java.lang.Integer as Int', [
				[GroovyTokenId.IMPORT, 0, 6, 1, 'import'],
				[GroovyTokenId.Whitespaces, 6, 7, 1, ' '],
				[GroovyTokenId.Identifier, 7, 11, 1, 'java'],
				[GroovyTokenId.Dot, 11, 12, 1, '.'],
				[GroovyTokenId.Identifier, 12, 16, 1, 'lang'],
				[GroovyTokenId.Dot, 16, 17, 1, '.'],
				[GroovyTokenId.Identifier, 17, 24, 1, 'Integer'],
				[GroovyTokenId.Whitespaces, 24, 25, 1, ' '],
				[GroovyTokenId.AS, 25, 27, 1, 'as'],
				[GroovyTokenId.Whitespaces, 27, 28, 1, ' '],
				[GroovyTokenId.Identifier, 28, 31, 1, 'Int']
			]],
			[GroovyTokenId.Whitespaces, 31, 32, 1, ' '],
			[GroovyTokenId.Identifier, 32, 35, 1, 'Int']
		]]);
	});
});
