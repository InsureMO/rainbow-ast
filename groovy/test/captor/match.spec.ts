import {TokenMatcher} from '../../src/captor';

describe('Token matcher', () => {
	test('$', async () => {
		const matcher = TokenMatcher.build('$');
		const first = matcher.first;
		expect(first.char).toBe('$');
		expect(first.minTimes).toBe(1);
		expect(first.maxTimes).toBe(1);
		expect(first.anti).toBeFalsy();
	});
	const match$$ = (matcher: TokenMatcher) => {
		const [first, second, ...rest] = matcher.matches;
		expect(first.char).toBe('$');
		expect(first.minTimes).toBe(1);
		expect(first.maxTimes).toBe(1);
		expect(first.anti).toBeFalsy();
		expect(second.char).toBe('$');
		expect(second.minTimes).toBe(1);
		expect(second.maxTimes).toBe(1);
		expect(second.anti).toBeFalsy();
		expect(rest.length).toBe(0);
	};
	test('$:2, $:2,2, $$', async () => {
		match$$(TokenMatcher.build('$:2'));
		match$$(TokenMatcher.build('$:2,2'));
		match$$(TokenMatcher.build('$$'));
	});
});
