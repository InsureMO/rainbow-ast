import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Annotation', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Annotation: Simple #1', async () => {
		const ast = builder.ast('@');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 1, 1, '@', [
			[GroovyTokenId.AnnotationDecl, 0, 1, 1, '@', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@']
			]]
		]]);
	});
	test('Annotation: Simple #2', async () => {
		const ast = builder.ast('@Ann\n');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 5, 1, '@Ann\n', [
			[GroovyTokenId.AnnotationDecl, 0, 4, 1, '@Ann', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 4, 1, 'Ann']
			]],
			[GroovyTokenId.Newline, 4, 5, 1, '\n']
		]]);
	});
	test('Annotation: Simple #3', async () => {
		const ast = builder.ast('@test.Ann');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 9, 1, '@test.Ann', [
			[GroovyTokenId.AnnotationDecl, 0, 9, 1, '@test.Ann', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 5, 1, 'test'],
				[GroovyTokenId.Dot, 5, 6, 1, '.'],
				[GroovyTokenId.Identifier, 6, 9, 1, 'Ann']
			]]
		]]);
	});
	test('Annotation: Simple #4', async () => {
		const ast = builder.ast('@test.Ann()');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 11, 1, '@test.Ann()', [
			[GroovyTokenId.AnnotationDecl, 0, 11, 1, '@test.Ann()', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 5, 1, 'test'],
				[GroovyTokenId.Dot, 5, 6, 1, '.'],
				[GroovyTokenId.Identifier, 6, 9, 1, 'Ann'],
				[GroovyTokenId.AnnotationDeclValues, 9, 11, 1, '()', [
					[GroovyTokenId.LParen, 9, 10, 1, '('],
					[GroovyTokenId.RParen, 10, 11, 1, ')']
				]]
			]]
		]]);
	});
	test('Annotation: Simple #5', async () => {
		const ast = builder.ast('@test.Ann(\n)\n');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 13, 1, '@test.Ann(\n)\n', [
			[GroovyTokenId.AnnotationDecl, 0, 12, 1, '@test.Ann(\n)', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 5, 1, 'test'],
				[GroovyTokenId.Dot, 5, 6, 1, '.'],
				[GroovyTokenId.Identifier, 6, 9, 1, 'Ann'],
				[GroovyTokenId.AnnotationDeclValues, 9, 12, 1, '(\n)', [
					[GroovyTokenId.LParen, 9, 10, 1, '('],
					[GroovyTokenId.Newline, 10, 11, 1, '\n'],
					[GroovyTokenId.RParen, 11, 12, 2, ')']
				]]
			]],
			[GroovyTokenId.Newline, 12, 13, 2, '\n']
		]]);
	});
	test('Annotation: Simple #6', async () => {
		const ast = builder.ast('@test.Ann/*\n*/(//\n)\n');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 20, 1, '@test.Ann/*\n*/(//\n)\n', [
			[GroovyTokenId.AnnotationDecl, 0, 19, 1, '@test.Ann/*\n*/(//\n)', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 5, 1, 'test'],
				[GroovyTokenId.Dot, 5, 6, 1, '.'],
				[GroovyTokenId.Identifier, 6, 9, 1, 'Ann'],
				[GroovyTokenId.MLComment, 9, 14, 1, '/*\n*/', [
					[GroovyTokenId.MLCommentStartMark, 9, 11, 1, '/*'],
					[GroovyTokenId.Newline, 11, 12, 1, '\n'],
					[GroovyTokenId.MLCommentEndMark, 12, 14, 2, '*/']
				]],
				[GroovyTokenId.AnnotationDeclValues, 14, 19, 2, '(//\n)', [
					[GroovyTokenId.LParen, 14, 15, 2, '('],
					[GroovyTokenId.SLComment, 15, 17, 2, '//', [
						[GroovyTokenId.SLCommentStartMark, 15, 17, 2, '//']
					]],
					[GroovyTokenId.Newline, 17, 18, 2, '\n'],
					[GroovyTokenId.RParen, 18, 19, 3, ')']
				]]
			]],
			[GroovyTokenId.Newline, 19, 20, 3, '\n']
		]]);
	});
	test('Annotation: Simple #7', async () => {
		const ast = builder.ast('@Ann (100)');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 10, 1, '@Ann (100)', [
			[GroovyTokenId.AnnotationDecl, 0, 10, 1, '@Ann (100)', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 4, 1, 'Ann'],
				[GroovyTokenId.Whitespaces, 4, 5, 1, ' '],
				[GroovyTokenId.AnnotationDeclValues, 5, 10, 1, '(100)', [
					[GroovyTokenId.LParen, 5, 6, 1, '('],
					[GroovyTokenId.AnnotationDeclValue, 6, 9, 1, '100', [
						[GroovyTokenId.IntegralLiteral, 6, 9, 1, '100', [
							[GroovyTokenId.Number, 6, 9, 1, '100']
						]]
					]],
					[GroovyTokenId.RParen, 9, 10, 1, ')']
				]]
			]]
		]]);
	});
	test('Annotation: Simple #8', async () => {
		const ast = builder.ast('@Ann (100,"2")');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 14, 1, '@Ann (100,"2")', [
			[GroovyTokenId.AnnotationDecl, 0, 14, 1, '@Ann (100,"2")', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 4, 1, 'Ann'],
				[GroovyTokenId.Whitespaces, 4, 5, 1, ' '],
				[GroovyTokenId.AnnotationDeclValues, 5, 14, 1, '(100,"2")', [
					[GroovyTokenId.LParen, 5, 6, 1, '('],
					[GroovyTokenId.AnnotationDeclValue, 6, 9, 1, '100', [
						[GroovyTokenId.IntegralLiteral, 6, 9, 1, '100', [
							[GroovyTokenId.Number, 6, 9, 1, '100']
						]]
					]],
					[GroovyTokenId.Comma, 9, 10, 1, ','],
					[GroovyTokenId.AnnotationDeclValue, 10, 13, 1, '"2"', [
						[GroovyTokenId.GStringLiteral, 10, 13, 1, '"2"', [
							[GroovyTokenId.GStringMark, 10, 11, 1, '"'],
							[GroovyTokenId.Word, 11, 12, 1, '2'],
							[GroovyTokenId.GStringMark, 12, 13, 1, '"']
						]]
					]],
					[GroovyTokenId.RParen, 13, 14, 1, ')']
				]]
			]]
		]]);
	});
	test('Annotation: Simple #9', async () => {
		const ast = builder.ast('@Ann(value=100)');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 15, 1, '@Ann(value=100)', [
			[GroovyTokenId.AnnotationDecl, 0, 15, 1, '@Ann(value=100)', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 4, 1, 'Ann'],
				[GroovyTokenId.AnnotationDeclValues, 4, 15, 1, '(value=100)', [
					[GroovyTokenId.LParen, 4, 5, 1, '('],
					[GroovyTokenId.AnnotationDeclValue, 5, 14, 1, 'value=100', [
						[GroovyTokenId.Identifier, 5, 10, 1, 'value'],
						[GroovyTokenId.Assign, 10, 11, 1, '='],
						[GroovyTokenId.IntegralLiteral, 11, 14, 1, '100', [
							[GroovyTokenId.Number, 11, 14, 1, '100']
						]]
					]],
					[GroovyTokenId.RParen, 14, 15, 1, ')']
				]]
			]]
		]]);
	});
	test('Annotation: Simple #10', async () => {
		const ast = builder.ast('@Ann(java.util.List)');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 20, 1, '@Ann(java.util.List)', [
			[GroovyTokenId.AnnotationDecl, 0, 20, 1, '@Ann(java.util.List)', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 4, 1, 'Ann'],
				[GroovyTokenId.AnnotationDeclValues, 4, 20, 1, '(java.util.List)', [
					[GroovyTokenId.LParen, 4, 5, 1, '('],
					[GroovyTokenId.AnnotationDeclValue, 5, 19, 1, 'java.util.List', [
						[GroovyTokenId.Identifier, 5, 9, 1, 'java'],
						[GroovyTokenId.Dot, 9, 10, 1, '.'],
						[GroovyTokenId.Identifier, 10, 14, 1, 'util'],
						[GroovyTokenId.Dot, 14, 15, 1, '.'],
						[GroovyTokenId.Identifier, 15, 19, 1, 'List']
					]],
					[GroovyTokenId.RParen, 19, 20, 1, ')']
				]]
			]]
		]]);
	});
	test('Annotation: Continuous start marks', async () => {
		const ast = builder.ast('@@');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 2, 1, '@@', [
			[GroovyTokenId.AnnotationDecl, 0, 1, 1, '@', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@']
			]],
			[GroovyTokenId.AnnotationDecl, 1, 2, 1, '@', [
				[GroovyTokenId.AnnotationStartMark, 1, 2, 1, '@']
			]]
		]]);
	});
	test('Annotation: Start mark after identifier', async () => {
		const ast = builder.ast('@Ann @');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 6, 1, '@Ann @', [
			[GroovyTokenId.AnnotationDecl, 0, 4, 1, '@Ann', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 4, 1, 'Ann']
			]],
			[GroovyTokenId.Whitespaces, 4, 5, 1, ' '],
			[GroovyTokenId.AnnotationDecl, 5, 6, 1, '@', [
				[GroovyTokenId.AnnotationStartMark, 5, 6, 1, '@']
			]]
		]]);
	});
	test('Annotation: Identifiable keywords of annotation class', async () => {
		const ast = builder.ast('@as.def.var.record.sealed.permits.yield.in.Ann');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 46, 1, '@as.def.var.record.sealed.permits.yield.in.Ann', [
			[GroovyTokenId.AnnotationDecl, 0, 46, 1, '@as.def.var.record.sealed.permits.yield.in.Ann', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 3, 1, 'as'],
				[GroovyTokenId.Dot, 3, 4, 1, '.'],
				[GroovyTokenId.Identifier, 4, 7, 1, 'def'],
				[GroovyTokenId.Dot, 7, 8, 1, '.'],
				[GroovyTokenId.Identifier, 8, 11, 1, 'var'],
				[GroovyTokenId.Dot, 11, 12, 1, '.'],
				[GroovyTokenId.Identifier, 12, 18, 1, 'record'],
				[GroovyTokenId.Dot, 18, 19, 1, '.'],
				[GroovyTokenId.Identifier, 19, 25, 1, 'sealed'],
				[GroovyTokenId.Dot, 25, 26, 1, '.'],
				[GroovyTokenId.Identifier, 26, 33, 1, 'permits'],
				[GroovyTokenId.Dot, 33, 34, 1, '.'],
				[GroovyTokenId.Identifier, 34, 39, 1, 'yield'],
				[GroovyTokenId.Dot, 39, 40, 1, '.'],
				[GroovyTokenId.Identifier, 40, 42, 1, 'in'],
				[GroovyTokenId.Dot, 42, 43, 1, '.'],
				[GroovyTokenId.Identifier, 43, 46, 1, 'Ann']
			]]
		]]);
	});
	test('Annotation: Keywords of annotation class', async () => {
		const ast = builder.ast('@as.import');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 10, 1, '@as.import', [
			[GroovyTokenId.AnnotationDecl, 0, 4, 1, '@as.', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 3, 1, 'as'],
				[GroovyTokenId.Dot, 3, 4, 1, '.']
			]],
			[GroovyTokenId.ImportDecl, 4, 10, 1, 'import', [
				[GroovyTokenId.IMPORT, 4, 10, 1, 'import']
			]]
		]]);
	});
	test('Annotation: No annotation class', async () => {
		const ast = builder.ast('@.');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 2, 1, '@.', [
			[GroovyTokenId.AnnotationDecl, 0, 1, 1, '@', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@']
			]],
			[GroovyTokenId.Dot, 1, 2, 1, '.']
		]]);
	});
	test('Annotation: Identifiable keywords of value class', async () => {
		const ast = builder.ast('@Ann(as.def.var.record.sealed.permits.yield.in.Ann)');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 51, 1, '@Ann(as.def.var.record.sealed.permits.yield.in.Ann)', [
			[GroovyTokenId.AnnotationDecl, 0, 51, 1, '@Ann(as.def.var.record.sealed.permits.yield.in.Ann)', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 4, 1, 'Ann'],
				[GroovyTokenId.AnnotationDeclValues, 4, 51, 1, '(as.def.var.record.sealed.permits.yield.in.Ann)', [
					[GroovyTokenId.LParen, 4, 5, 1, '('],
					[GroovyTokenId.AnnotationDeclValue, 5, 50, 1, 'as.def.var.record.sealed.permits.yield.in.Ann', [
						[GroovyTokenId.Identifier, 5, 7, 1, 'as'],
						[GroovyTokenId.Dot, 7, 8, 1, '.'],
						[GroovyTokenId.Identifier, 8, 11, 1, 'def'],
						[GroovyTokenId.Dot, 11, 12, 1, '.'],
						[GroovyTokenId.Identifier, 12, 15, 1, 'var'],
						[GroovyTokenId.Dot, 15, 16, 1, '.'],
						[GroovyTokenId.Identifier, 16, 22, 1, 'record'],
						[GroovyTokenId.Dot, 22, 23, 1, '.'],
						[GroovyTokenId.Identifier, 23, 29, 1, 'sealed'],
						[GroovyTokenId.Dot, 29, 30, 1, '.'],
						[GroovyTokenId.Identifier, 30, 37, 1, 'permits'],
						[GroovyTokenId.Dot, 37, 38, 1, '.'],
						[GroovyTokenId.Identifier, 38, 43, 1, 'yield'],
						[GroovyTokenId.Dot, 43, 44, 1, '.'],
						[GroovyTokenId.Identifier, 44, 46, 1, 'in'],
						[GroovyTokenId.Dot, 46, 47, 1, '.'],
						[GroovyTokenId.Identifier, 47, 50, 1, 'Ann']
					]],
					[GroovyTokenId.RParen, 50, 51, 1, ')']
				]]
			]]
		]]);
	});
	test('Annotation: Keyword as identifier of value property name', async () => {
		const ast = builder.ast('@Ann(private = true, public = false);');
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 37, 1, '@Ann(private = true, public = false);', [
			[GroovyTokenId.AnnotationDecl, 0, 36, 1, '@Ann(private = true, public = false)', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 4, 1, 'Ann'],
				[GroovyTokenId.AnnotationDeclValues, 4, 36, 1, '(private = true, public = false)', [
					[GroovyTokenId.LParen, 4, 5, 1, '('],
					[GroovyTokenId.AnnotationDeclValue, 5, 19, 1, 'private = true', [
						[GroovyTokenId.Identifier, 5, 12, 1, 'private'],
						[GroovyTokenId.Whitespaces, 12, 13, 1, ' '],
						[GroovyTokenId.Assign, 13, 14, 1, '='],
						[GroovyTokenId.Whitespaces, 14, 15, 1, ' '],
						[GroovyTokenId.BooleanTrue, 15, 19, 1, 'true']
					]],
					[GroovyTokenId.Comma, 19, 20, 1, ','],
					[GroovyTokenId.Whitespaces, 20, 21, 1, ' '],
					[GroovyTokenId.AnnotationDeclValue, 21, 35, 1, 'public = false', [
						[GroovyTokenId.Identifier, 21, 27, 1, 'public'],
						[GroovyTokenId.Whitespaces, 27, 28, 1, ' '],
						[GroovyTokenId.Assign, 28, 29, 1, '='],
						[GroovyTokenId.Whitespaces, 29, 30, 1, ' '],
						[GroovyTokenId.BooleanFalse, 30, 35, 1, 'false']
					]],
					[GroovyTokenId.RParen, 35, 36, 1, ')']
				]]
			]],
			[GroovyTokenId.Semicolon, 36, 37, 1, ';']
		]]);
	});
});
