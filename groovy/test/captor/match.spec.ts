import {
	Char,
	CharMatchAnyTimes,
	CharMatchRule,
	CharMatchSpecificTimes,
	CharMatchThenEndBeforeMe,
	Chars,
	TokenMatcher,
	TokenMatcherBuilder
} from '../../src/captor';

const matches = (rules: Array<Chars | { anyTimeChar: Char, } | { endBeforeMeChar: Char }>, matcher: TokenMatcher) => {
	const matches = matcher.matches;
	const length = rules.reduce((length, rule) => {
		if (typeof rule === 'string') {
			return length + rule.length;
		} else if ((rule as any).anyTimeChar != null) {
			return length + 12;
		} else if ((rule as any).endBeforeMeChar != null) {
			return length + 1;
		} else {
			throw new Error(`Unsupported rule[${rule}].`);
		}
	}, 0);
	expect(matches.length).toBe(length);

	let matchIndex = 0;
	rules.forEach(rule => {
		if (typeof rule === 'string') {
			for (let index = 0, count = rule.length; index < count; index++) {
				const {rule: charRule, min, max} = matches[matchIndex++] as CharMatchRule & CharMatchSpecificTimes;
				expect(charRule).toBe(rule[index]);
				expect(min).toBe(1);
				expect(max).toBe(1);
			}
		} else if ((rule as any).anyTimeChar != null) {
			const {anyTimeChar} = rule as any;
			for (let index = 0; index < 11; index++) {
				const {rule, min, max} = matches[matchIndex++] as CharMatchRule & CharMatchSpecificTimes;
				expect(rule).toBe(anyTimeChar);
				expect(min).toBe(1);
				expect(max).toBe(1);
			}
			{
				const {rule, anyTimes} = matches[matchIndex++] as CharMatchRule & CharMatchAnyTimes;
				expect(rule).toBe(anyTimeChar);
				expect(anyTimes).toBeTruthy();
			}
		} else if ((rule as any).endBeforeMeChar != null) {
			const {endBeforeMeChar} = rule as any;
			{
				const {rule, endBeforeMe} = matches[matchIndex++] as CharMatchRule & CharMatchThenEndBeforeMe;
				expect(rule).toBe(endBeforeMeChar);
				expect(endBeforeMe).toBeTruthy();
			}
		} else {
			throw new Error(`Unsupported rule[${rule}].`);
		}
	});
};
const matchChars = (chars: Chars, matchers: Array<TokenMatcher>) => {
	expect(matchers.length).toBe(1);
	matches([chars], matchers[0]);
};

describe('Token matcher', () => {
	test('$', async () => {
		const matchers = TokenMatcherBuilder.build('$');
		expect(matchers.length).toBe(1);
		const matcher = matchers[0];
		const first = matcher.first;
		expect(first.rule).toBe('$');
		expect((first as CharMatchSpecificTimes).min).toBe(1);
		expect((first as CharMatchSpecificTimes).max).toBe(1);
	});
	test('Multiple chars', async () => {
		matchChars('$$', TokenMatcherBuilder.build('$:2'));
		matchChars('$$', TokenMatcherBuilder.build('$:2,2'));
		matchChars('$$', TokenMatcherBuilder.build('$$'));
		matchChars('!in', TokenMatcherBuilder.build('!in'));
	});
	test('Once or not at first', async () => {
		const matchers = TokenMatcherBuilder.build('!:?;in');
		matchChars('in', [matchers[0]]);
		matchChars('!in', [matchers[1]]);
	});
	test('Once or not at middle', async () => {
		const matchers = TokenMatcherBuilder.build('i;!:?;n');
		matchChars('in', [matchers[0]]);
		matchChars('i!n', [matchers[1]]);
	});
	test('Once or not at last', async () => {
		const matchers = TokenMatcherBuilder.build('in;!:?');
		matchChars('in', [matchers[0]]);
		matchChars('in!', [matchers[1]]);
	});
	test('Once or not at first and last', async () => {
		const matchers = TokenMatcherBuilder.build('!:?;in;!:?');
		matchChars('in', [matchers[0]]);
		matchChars('in!', [matchers[1]]);
		matchChars('!in', [matchers[2]]);
		matchChars('!in!', [matchers[3]]);
	});
	test('Any times at first', async () => {
		const matchers = TokenMatcherBuilder.build('!:*;in');
		expect(matchers.length).toBe(12);
		for (let index = 0; index < 11; index++) {
			matchChars(`${new Array(index).fill('!').join('')}in`, [matchers[index]]);
		}
		matches([{anyTimeChar: '!'}, 'in'], matchers[11]);
	});
	test('Any times at middle', async () => {
		const matchers = TokenMatcherBuilder.build('i;!:*;n');
		expect(matchers.length).toBe(12);
		for (let index = 0; index < 11; index++) {
			matchChars(`i${new Array(index).fill('!').join('')}n`, [matchers[index]]);
		}
		matches(['i', {anyTimeChar: '!'}, 'n'], matchers[11]);
	});
	test('Any times at last', async () => {
		const matchers = TokenMatcherBuilder.build('in;!:*');
		expect(matchers.length).toBe(12);
		for (let index = 0; index < 11; index++) {
			matchChars(`in${new Array(index).fill('!').join('')}`, [matchers[index]]);
		}
		matches(['in', {anyTimeChar: '!'}], matchers[11]);
	});
	test('Any times at first and last, 144 possibilities, wow!', async () => {
		const matchers = TokenMatcherBuilder.build('!:*;in;!:*');
		expect(matchers.length).toBe(144);
		let matcherIndex = 0;
		for (let i = 0; i < 11; i++) {
			const prefix = new Array(i).fill('!').join('');
			for (let j = 0; j < 11; j++) {
				matchChars(`${prefix}in${new Array(j).fill('!').join('')}`, [matchers[matcherIndex++]]);
			}
			matches([`${prefix}in`, {anyTimeChar: '!'}], matchers[matcherIndex++]);
		}
		for (let j = 0; j < 11; j++) {
			matches([{anyTimeChar: '!'}, `in${new Array(j).fill('!').join('')}`], matchers[matcherIndex++]);
		}
		matches([{anyTimeChar: '!'}, 'in', {anyTimeChar: '!'}], matchers[matcherIndex++]);
	});
	test('Math then end before me', async () => {
		const matchers = TokenMatcherBuilder.build('in;!:!');
		expect(matchers.length).toBe(1);
		matches(['in', {endBeforeMeChar: '!'}], matchers[0]);
	});
});
