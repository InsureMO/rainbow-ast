import {createDefaultAstBuilder, GroovyTokenId} from '../../src';
import {AstChecker} from '../utils';

describe('Capture Annotation', () => {
	const builder = createDefaultAstBuilder({verbose: true});

	test('Annotation: Simple', async () => {
		const ast = builder.ast('@');
		// noinspection DuplicatedCode
		AstChecker.check(ast, [GroovyTokenId.COMPILATION_UNIT, 0, 1, 1, '@', [
			[GroovyTokenId.AnnotationDecl, 0, 1, 1, '@', [
				[GroovyTokenId.AnnotationStartMark, 0, 1, 1, '@']
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
});
