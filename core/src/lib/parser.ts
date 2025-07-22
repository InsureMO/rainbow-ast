import {Ast} from './ast';

export abstract class AbstractAstParser {
	abstract parse(document: string): Ast;
}
