import {JCM} from '../src';

describe('Whitespace', () => {
	test('Tab', async () => {
		expect(JCM.Whitespace('\t')).toBeFalsy();
		expect(JCM.Whitespace('\r')).toBeFalsy();
		expect(JCM.Whitespace('\n')).toBeFalsy();
		expect(JCM.Whitespace(' ')).toBeTruthy();
	});
});
