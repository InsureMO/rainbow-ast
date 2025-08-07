import * as fs from 'fs';
import * as path from 'path';
import {DGP, T} from '../../src';
import {AstChecker} from '../utils';
import {l1} from './l1';
import {l16} from './l16';
import {l17_25} from './l17.25';
import {l2} from './l2';
import {l26_34} from './l26.34';
import {l3} from './l3';
import {l35_39} from './l35.39';
import {l4_5} from './l4.5';
import {l40_44} from './l40.44';
import {l45_48} from './l45.48';
import {l49} from './l49';
import {l50_59} from './l50.59';
import {l6_15} from './l6.15';
import {l60_67} from './l60.67';
import {l68_79} from './l68.79';
import {l80_97} from './l80.97';
import {l98_101} from './l98.101';

const readFileAsText = (filePath: string): string => {
	const absolutePath = path.join(__dirname, filePath);
	return fs.readFileSync(absolutePath, 'utf8');
};

describe('Regular test', () => {
	test('Regular test', async () => {
		const text = readFileAsText('test.groovy');
		const ast = DGP.parse(text, {verbose: true, shebang: true});
		const l = {v: 0};
		AstChecker.check(ast, [T.CompilationUnit, l.v++, 1, text, [
			...l1(l),
			...l2(l),
			...l3(l),
			...l4_5(l),
			...l6_15(l),
			...l16(l),
			...l17_25(l),
			...l26_34(l),
			...l35_39(l),
			...l40_44(l),
			...l45_48(l),
			...l49(l),
			...l50_59(l),
			...l60_67(l),
			...l68_79(l),
			...l80_97(l),
			...l98_101(l)
		]]);
	});
});
