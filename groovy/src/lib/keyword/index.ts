import {ConstParser} from './const';
import {FalseParser} from './false';
import {GotoParser} from './goto';
import {NullParser} from './null';
import {SuperParser} from './super';
import {ThisParser} from './this';
import {ThreadsafeParser} from './threadsafe';
import {TrueParser} from './true';

// @interface -> tsscmfv: type
// abstract -> tsscmfv: type, constructor (incorrect), method
export * from './as';                               // as: as alias (import), as type (constant or variable)
// assert: assert expression
// boolean -> primitive types
// break: for loop, switch route, while loop, do-while loop
// byte -> primitive types
// case: switch route
// catch: try-catch
// char -> primitive types
// class -> tsscmfv: type
export * from './const';                            // const: reserved
// continue: for loop, while loop, do-while loop
// def -> tsscmfv: type, constructor, method, field, variable
// default -> tsscmfv: constructor (incorrect), method; switch route
// do: do-while loop
// double -> primitive types
// else: if-else
// enum -> tsscmfv: type
// extends -> tsscmfv: type inheriting keywords
export * from './false';                            // false
// final -> tsscmfv: type, constructor (incorrect), method
// finally: try-catch
// float -> primitive types
// for: for loop
export * from './goto';                             // goto: reserved
// if: if-else
// implements -> tsscmfv: type inheriting keywords
// import -> import declaration
// in -> operators, and !in
// instanceof -> operators, and !instanceof
// int -> primitive types
// interface -> tsscmfv: type
// long -> primitive types
// native -> tsscmfv: constructor (incorrect), method
// new: new expression
// non-sealed -> tsscmfv: type
export * from './null';                             // null
// package -> package declaration
// permits -> tsscmfv: type inheriting keywords
// public protected private -> tsscmfv: type, constructor, method, field
// record -> tsscmfv: type
// return: return expression
// sealed -> tsscmfv: type
// short -> primitive types
// static -> tsscmfv: type, constructor (incorrect), method, field; static import
// strictfp -> tsscmfv: type, constructor, method, field
export * from './super';                            // super
// switch: switch-case
// synchronized -> tsscmfv: method, synchronize block
export * from './this';                             // this
export * from './threadsafe';                       // threadsafe: reserved
// throw: throw expression
// throws -> tsscmfv: constructor method
// trait -> tsscmfv: type
// transient -> tsscmfv: field
export * from './true';                             // true
// try: try-catch
// var -> tsscmfv: type, constructor, method, field, variable
// void -> tsscmfv: method
// volatile -> tsscmfv: field
// while: while loop
// yield: switch route

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
