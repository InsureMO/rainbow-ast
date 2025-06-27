import {Char, Chars, TokenCharMatchUsage, TokenMatcher, TokenMatcherBuilder} from '../src';

const TMB = TokenMatcherBuilder.DEFAULT;

const matches = (rules: Array<Chars | { anyTimeChar: Char, } | { endBeforeMeChar: Char }>, matcher: TokenMatcher) => {
	const matches = matcher.matches;
	const length = rules.reduce((length, rule) => {
		if (typeof rule === 'string') {
			return length + rule.length;
		} else if ((rule as any).anyTimeChar != null) {
			return length + TMB.LongestKeywordLength + 2;
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
				const {rule: charRule, usage} = matches[matchIndex++];
				expect(charRule).toBe(rule[index]);
				expect(usage).toBe(TokenCharMatchUsage.ONCE);
			}
		} else if ((rule as any).anyTimeChar != null) {
			const {anyTimeChar} = rule as any;
			for (let index = 0; index <= TMB.LongestKeywordLength; index++) {
				const {rule, usage} = matches[matchIndex++];
				expect(rule).toBe(anyTimeChar);
				expect(usage).toBe(TokenCharMatchUsage.ONCE);
			}
			{
				const {rule, usage} = matches[matchIndex++];
				expect(rule).toBe(anyTimeChar);
				expect(usage).toBe(TokenCharMatchUsage.ANY_TIMES);
			}
		} else if ((rule as any).endBeforeMeChar != null) {
			const {endBeforeMeChar} = rule as any;
			{
				const {rule, usage} = matches[matchIndex++];
				expect(rule).toBe(endBeforeMeChar);
				expect(usage).toBe(TokenCharMatchUsage.END_BEFORE_ME);
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
		matchChars('$', TMB.build('$'));
	});
	test('Multiple chars', async () => {
		matchChars('$$', TMB.build('$:2'));
		matchChars('$$', TMB.build('$:2,2'));
		matchChars('$$', TMB.build('$$'));
		matchChars('!in', TMB.build('!in'));
	});
	test('Once or not at first', async () => {
		const matchers = TMB.build('!:?;in');
		matchChars('in', [matchers[0]]);
		matchChars('!in', [matchers[1]]);
	});
	test('Once or not at middle', async () => {
		const matchers = TMB.build('i;!:?;n');
		matchChars('in', [matchers[0]]);
		matchChars('i!n', [matchers[1]]);
	});
	test('Once or not at last', async () => {
		const matchers = TMB.build('in;!:?');
		matchChars('in', [matchers[0]]);
		matchChars('in!', [matchers[1]]);
	});
	test('Once or not at first and last', async () => {
		const matchers = TMB.build('!:?;in;!:?');
		matchChars('in', [matchers[0]]);
		matchChars('in!', [matchers[1]]);
		matchChars('!in', [matchers[2]]);
		matchChars('!in!', [matchers[3]]);
	});
	test('Any times at last', async () => {
		const matchers = TMB.build('in;!:*');
		expect(matchers.length).toBe(TMB.LongestKeywordLength + 2);
		for (let index = 0; index <= TMB.LongestKeywordLength; index++) {
			matchChars(`in${new Array(index).fill('!').join('')}`, [matchers[index]]);
		}
		matches(['in', {anyTimeChar: '!'}], matchers[TMB.LongestKeywordLength + 1]);
	});
	test('Math then end before me', async () => {
		const matchers = TMB.build('in;!:!');
		expect(matchers.length).toBe(1);
		matches(['in', {endBeforeMeChar: '!'}], matchers[0]);
	});
});
