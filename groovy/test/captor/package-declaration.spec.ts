import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Package Declaration', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Package Declaration: Simple #1', async () => {
		const ast = builder.ast('package');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 7, 1, 'package', [
			[GroovyTokenId.PackageDecl, 0, 7, 1, 'package', [
				[GroovyTokenId.PACKAGE, 0, 7, 1, 'package']
			]]
		]]);
	});
	test('Package Declaration: Simple #2', async () => {
		const ast = builder.ast('package java.util');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 17, 1, 'package java.util', [
			[GroovyTokenId.PackageDecl, 0, 17, 1, 'package java.util', [
				[GroovyTokenId.PACKAGE, 0, 7, 1, 'package'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.Identifier, 8, 12, 1, 'java'],
				[GroovyTokenId.Dot, 12, 13, 1, '.'],
				[GroovyTokenId.Identifier, 13, 17, 1, 'util']
			]]
		]]);
	});
	test('Package Declaration: Simple #3', async () => {
		const ast = builder.ast('package java.util\n');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 18, 1, 'package java.util\n', [
			[GroovyTokenId.PackageDecl, 0, 17, 1, 'package java.util', [
				[GroovyTokenId.PACKAGE, 0, 7, 1, 'package'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.Identifier, 8, 12, 1, 'java'],
				[GroovyTokenId.Dot, 12, 13, 1, '.'],
				[GroovyTokenId.Identifier, 13, 17, 1, 'util']
			]],
			[GroovyTokenId.Newline, 17, 18, 1, '\n']
		]]);
	});
	test('Package Declaration: Simple #4', async () => {
		const ast = builder.ast('package java.util; ');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 19, 1, 'package java.util; ', [
			[GroovyTokenId.PackageDecl, 0, 18, 1, 'package java.util;', [
				[GroovyTokenId.PACKAGE, 0, 7, 1, 'package'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.Identifier, 8, 12, 1, 'java'],
				[GroovyTokenId.Dot, 12, 13, 1, '.'],
				[GroovyTokenId.Identifier, 13, 17, 1, 'util'],
				[GroovyTokenId.Semicolon, 17, 18, 1, ';']
			]],
			[GroovyTokenId.Whitespaces, 18, 19, 1, ' ']
		]]);
	});
	test('Package Declaration: Continuous dots', async () => {
		const ast = builder.ast('package java..util');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 18, 1, 'package java..util', [
			[GroovyTokenId.PackageDecl, 0, 13, 1, 'package java.', [
				[GroovyTokenId.PACKAGE, 0, 7, 1, 'package'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.Identifier, 8, 12, 1, 'java'],
				[GroovyTokenId.Dot, 12, 13, 1, '.']
			]],
			[GroovyTokenId.Dot, 13, 14, 1, '.'],
			[GroovyTokenId.Identifier, 14, 18, 1, 'util']
		]]);
	});
	test('Package Declaration: Continuous identifiers', async () => {
		const ast = builder.ast('package java util');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 17, 1, 'package java util', [
			[GroovyTokenId.PackageDecl, 0, 12, 1, 'package java', [
				[GroovyTokenId.PACKAGE, 0, 7, 1, 'package'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.Identifier, 8, 12, 1, 'java']
			]],
			[GroovyTokenId.Whitespaces, 12, 13, 1, ' '],
			[GroovyTokenId.Identifier, 13, 17, 1, 'util']
		]]);
	});
	test('Package Declaration: Identifiable keywords', async () => {
		const ast = builder.ast('package as.def.var.record.sealed.permits.yield.in');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 49, 1, 'package as.def.var.record.sealed.permits.yield.in', [
			[GroovyTokenId.PackageDecl, 0, 49, 1, 'package as.def.var.record.sealed.permits.yield.in', [
				[GroovyTokenId.PACKAGE, 0, 7, 1, 'package'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.Identifier, 8, 10, 1, 'as'],
				[GroovyTokenId.Dot, 10, 11, 1, '.'],
				[GroovyTokenId.Identifier, 11, 14, 1, 'def'],
				[GroovyTokenId.Dot, 14, 15, 1, '.'],
				[GroovyTokenId.Identifier, 15, 18, 1, 'var'],
				[GroovyTokenId.Dot, 18, 19, 1, '.'],
				[GroovyTokenId.Identifier, 19, 25, 1, 'record'],
				[GroovyTokenId.Dot, 25, 26, 1, '.'],
				[GroovyTokenId.Identifier, 26, 32, 1, 'sealed'],
				[GroovyTokenId.Dot, 32, 33, 1, '.'],
				[GroovyTokenId.Identifier, 33, 40, 1, 'permits'],
				[GroovyTokenId.Dot, 40, 41, 1, '.'],
				[GroovyTokenId.Identifier, 41, 46, 1, 'yield'],
				[GroovyTokenId.Dot, 46, 47, 1, '.'],
				[GroovyTokenId.Identifier, 47, 49, 1, 'in']
			]]
		]]);
	});
	test('Package Declaration: Keyword', async () => {
		const ast = builder.ast('package as.package');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 18, 1, 'package as.package', [
			[GroovyTokenId.PackageDecl, 0, 11, 1, 'package as.', [
				[GroovyTokenId.PACKAGE, 0, 7, 1, 'package'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.Identifier, 8, 10, 1, 'as'],
				[GroovyTokenId.Dot, 10, 11, 1, '.']
			]],
			[GroovyTokenId.PackageDecl, 11, 18, 1, 'package', [
				[GroovyTokenId.PACKAGE, 11, 18, 1, 'package']
			]]
		]]);
	});
	test('Package Declaration: Keyword non-sealed', async () => {
		const ast = builder.ast('package as.non-sealed');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 21, 1, 'package as.non-sealed', [
			[GroovyTokenId.PackageDecl, 0, 11, 1, 'package as.', [
				[GroovyTokenId.PACKAGE, 0, 7, 1, 'package'],
				[GroovyTokenId.Whitespaces, 7, 8, 1, ' '],
				[GroovyTokenId.Identifier, 8, 10, 1, 'as'],
				[GroovyTokenId.Dot, 10, 11, 1, '.']
			]],
			[GroovyTokenId.CcmfssDecl, 11, 21, 1, 'non-sealed', [
				[GroovyTokenId.NON_SEALED, 11, 21, 1, 'non-sealed']
			]]
		]]);
	});
});
