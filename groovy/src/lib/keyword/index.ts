import {BreakParser} from './break-parser';
import {ConstParser} from './const-parser';
import {ContinueParser} from './continue-parser';
import {FalseParser} from './false-parser';
import {GotoParser} from './goto-parser';
import {NullParser} from './null-parser';
import {SuperParser} from './super-parser';
import {SwitchCaseParser, SwitchParser} from './switch';
import {ThisParser} from './this-parser';
import {ThreadsafeParser} from './threadsafe-parser';
import {TrueParser} from './true-parser';

// ✅ @interface -> tsscmfv: type
// ✅ abstract -> tsscmfv: type, constructor (incorrect), method
// ✅ as: as alias (import), as type (constant or variable)
export * from './as-parsers';
// assert: assert expression
// ✅ boolean -> primitive types
// ✅ break: for loop, switch route, while loop, do-while loop
// ✅ byte -> primitive types
// ✅ case: switch-case
// catch: try-catch
// ✅ char -> primitive types
// ✅ class -> tsscmfv: type
// ✅ const: reserved
export * from './const-parser';
// ✅ continue: for loop, while loop, do-while loop
// ✅ def -> tsscmfv: type, constructor, method, field, variable
// ✅ default -> tsscmfv: constructor (incorrect), method; switch-case
// do: do-while loop
// ✅ double -> primitive types
// else: if-else
// ✅ enum -> tsscmfv: type
// ✅ extends -> tsscmfv: type inheriting keywords
// ✅ false
export * from './false-parser';
// ✅ final -> tsscmfv: type, constructor (incorrect), method
// finally: try-catch
// ✅ float -> primitive types
// for: for loop
// ✅ goto: reserved
export * from './goto-parser';
// if: if-else
// ✅ implements -> tsscmfv: type inheriting keywords
// ✅ import -> import declaration
// ✅ in -> operators, and !in
// ✅ instanceof -> operators, and !instanceof
// ✅ int -> primitive types
// ✅ interface -> tsscmfv: type
// ✅ long -> primitive types
// ✅ native -> tsscmfv: constructor (incorrect), method
// new: new expression
// ✅ non-sealed -> tsscmfv: type
// ✅ null
export * from './null-parser';
// ✅ package -> package declaration
// ✅ permits -> tsscmfv: type inheriting keywords
// ✅ public ✅ protected ✅ private -> tsscmfv: type, constructor, method, field
// ✅ record -> tsscmfv: type
// return: return expression
// ✅ sealed -> tsscmfv: type
// ✅ short -> primitive types
// ✅ static -> tsscmfv: type, constructor (incorrect), method, field; static import
// ✅ strictfp -> tsscmfv: type, constructor, method, field
// ✅ super
export * from './super-parser';
// ✅ switch: switch-case
export * from './switch';
// ✅ synchronized -> tsscmfv: method, synchronize block
// ✅ this
export * from './this-parser';
// ✅ threadsafe: reserved
export * from './threadsafe-parser';
// throw: throw expression
// ✅ throws -> tsscmfv: constructor method
// ✅ trait -> tsscmfv: type
// ✅ transient -> tsscmfv: field
// ✅ true
export * from './true-parser';
// try: try-catch
// ✅ var -> tsscmfv: type, constructor, method, field, variable
// ✅ void -> tsscmfv: method
// ✅ volatile -> tsscmfv: field
// while: while loop
// yield: switch-case

export const StandaloneKeywordParsers = [
	ConstParser.instance,
	FalseParser.instance,
	GotoParser.instance,
	NullParser.instance,
	SuperParser.instance,
	ThisParser.instance,
	ThreadsafeParser.instance,
	TrueParser.instance
];
export const ControlFlowKeywordParsers = [
	SwitchParser.instance,
	SwitchCaseParser.instance,
	BreakParser.instance,
	ContinueParser.instance
];
