import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Annotation', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Annotation: Simple #1', async () => {
		const ast = builder.ast('@');
		// noinspection DuplicatedCode
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 1, 1, '@', [
			[GroovyTokenId.AnnotationDecl, 0, 1, 1, '@', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@']
			]]
		]]);
	});
	test('Annotation: Simple #2', async () => {
		const ast = builder.ast('@Ann\n');
		// noinspection DuplicatedCode
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
		// noinspection DuplicatedCode
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
		// noinspection DuplicatedCode
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
		// noinspection DuplicatedCode
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
		// noinspection DuplicatedCode
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
		// noinspection DuplicatedCode
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 10, 1, '@Ann (100)', [
			[GroovyTokenId.AnnotationDecl, 0, 10, 1, '@Ann (100)', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@'],
				[GroovyTokenId.Identifier, 1, 4, 1, 'Ann'],
				[GroovyTokenId.Whitespaces, 4, 5, 1, ' '],
				[GroovyTokenId.AnnotationDeclValues, 5, 10, 1, '(100)', [
					[GroovyTokenId.LParen, 5, 6, 1, '('],
					[GroovyTokenId.IntegralLiteral, 6, 9, 1, '100', [
						[GroovyTokenId.Number, 6, 9, 1, '100']
					]],
					[GroovyTokenId.RParen, 9, 10, 1, ')']
				]]
			]]
		]]);
	});
	test('Annotation: Simple #8', async () => {
		const ast = builder.ast('@Ann(value=100)');
		// noinspection DuplicatedCode
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
	test('Annotation: Continuous start marks', async () => {
		const ast = builder.ast('@@');
		// noinspection DuplicatedCode
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
		// noinspection DuplicatedCode
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
});
