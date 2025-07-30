import * as fs from 'fs';
import * as path from 'path';
import {DGP} from '../../src';

const readFileAsText = (filePath: string): string => {
	const absolutePath = path.join(__dirname, filePath);
	return fs.readFileSync(absolutePath, 'utf8');
};

describe('Performance test', () => {
	test('Performance test', async () => {
		const text = readFileAsText('test.groovy');

		const times = 1000;
		const start = process.hrtime();
		for (let round = 0; round < times; round++) {
			DGP.parse(text, {verbose: false, shebang: true});
		}
		const [s, ns] = process.hrtime(start);
		console.log(`Spent ${(s * 1000 + ns / 1_000_000) / times}ms per round, for document[length=${text.length}].`);
	});
});
