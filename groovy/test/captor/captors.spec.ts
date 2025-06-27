import {CompilationUnit, TokenMatcherBuilder} from '@rainbow-ast/core';
import {AstBuildContext, AstBuildState, GroovyTokenId, TokenCaptor, TokenCaptors, TokenCaptureStatus} from '../../src';

describe('Captors', () => {
	const captors = new TokenCaptors('CompilationUnit');

	beforeAll(() => {
		// @formatter:off
		TokenMatcherBuilder.build('=').forEach(matcher => captors.addCaptors(new TokenCaptor({name: 'Assign', matcher})));
		TokenMatcherBuilder.build('==').forEach(matcher => captors.addCaptors(new TokenCaptor({name: 'Equal', matcher})));
		TokenMatcherBuilder.build('===').forEach(matcher => captors.addCaptors(new TokenCaptor({name: 'Identical', matcher})));
		TokenMatcherBuilder.build('public;fn#NotJNamePart:!').forEach(matcher => captors.addCaptors(new TokenCaptor({name: 'PUBLIC', matcher})));
		TokenMatcherBuilder.build('fn#JNameStart;fn#JNamePart:*;fn#NotJNamePart:!').forEach(matcher => captors.addCaptors(new TokenCaptor({name: 'Identifier', matcher})));
		// @formatter:on
	});

	test('Capture Assign', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('='), AstBuildState.CompilationUnit));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Assign);
		expect(token.text).toBe('=');
	});

	test('Capture Equal', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('=='), AstBuildState.CompilationUnit));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Equal);
		expect(token.text).toBe('==');
	});

	test('Capture Identical', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('==='), AstBuildState.CompilationUnit));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Identical);
		expect(token.text).toBe('===');
	});

	test('Capture PUBLIC', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('public'), AstBuildState.CompilationUnit));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.PUBLIC);
		expect(token.text).toBe('public');
	});

	test('Capture Identify abc', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('abc'), AstBuildState.CompilationUnit));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Identifier);
		expect(token.text).toBe('abc');
	});

	test('Capture Identify public1', async () => {
		const [status, token] = captors.capture(new AstBuildContext(new CompilationUnit('public1'), AstBuildState.CompilationUnit));
		expect(status).toBe(TokenCaptureStatus.Captured);
		expect(token).not.toBeNull();
		expect(token.id).toBe(GroovyTokenId.Identifier);
		expect(token.text).toBe('public1');
	});
});
