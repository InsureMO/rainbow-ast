import {
	AstBuildContext,
	CompilationUnit,
	Language,
	TokenCaptor,
	TokenCaptors,
	TokenCaptureStatus,
	TokenMatcherBuilder
} from '@rainbow-ast/core';
import {createDefaultAstBuilder, GroovyAstBuildState, GroovyTokenCapturePriorities, GroovyTokenId} from '../../src';

describe('Captors', () => {
	const TMB = TokenMatcherBuilder.DEFAULT;
	const tokenCaptors: Array<TokenCaptor> = [];
	// @formatter:off
	TMB.build('=').forEach(matcher => tokenCaptors.push(new TokenCaptor({tokenId: GroovyTokenId.Assign, name: 'Assign', matcher})));
	TMB.build('==').forEach(matcher => tokenCaptors.push(new TokenCaptor({tokenId: GroovyTokenId.Equal, name: 'Equal', matcher})));
	TMB.build('===').forEach(matcher => tokenCaptors.push(new TokenCaptor({tokenId: GroovyTokenId.Identical, name: 'Identical', matcher})));
	TMB.build('public;fn#NotJNamePart:!').forEach(matcher => tokenCaptors.push(new TokenCaptor({tokenId: GroovyTokenId.PUBLIC, name: 'PUBLIC', matcher})));
	TMB.build('fn#JNameStart;fn#JNamePart:*;fn#NotJNamePart:!').forEach(matcher => tokenCaptors.push(new TokenCaptor({tokenId: GroovyTokenId.Identifier, name: 'Identifier', matcher})));
	// @formatter:on
	const captors = new TokenCaptors({
		state: GroovyAstBuildState.CompilationUnit,
		name: 'CompilationUnit',
		captors: tokenCaptors
	});
	const language: Language = {
		// @ts-ignore
		tokenIds: GroovyTokenId,
		// @ts-ignore
		states: GroovyAstBuildState,
		initState: GroovyAstBuildState.CompilationUnit,
		tokenCapturePriorities: GroovyTokenCapturePriorities,
		captors: {
			[GroovyAstBuildState.CompilationUnit]: captors
		}
	};

	test('Capture Assign', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('='), language));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Assign);
		expect(token.text).toBe('=');
	});

	test('Capture Equal', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('=='), language));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Equal);
		expect(token.text).toBe('==');
	});

	test('Capture Identical', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('==='), language));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Identical);
		expect(token.text).toBe('===');
	});

	test('Capture PUBLIC', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('public'), language));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.PUBLIC);
		expect(token.text).toBe('public');
	});

	test('Capture Identify abc', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('abc'), language));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Identifier);
		expect(token.text).toBe('abc');
	});

	test('Capture Identify public1', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('public1'), language));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Identifier);
		expect(token.text).toBe('public1');
	});

	test('Print Language', async () => {
		const builder = createDefaultAstBuilder({verbose: true});
		builder.printLanguage();
	});
});
