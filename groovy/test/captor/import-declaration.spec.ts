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
});
