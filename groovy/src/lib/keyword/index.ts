import {AbstractParser} from './abstract';
import {DefParser} from './def';
import {FinalParser} from './final';
import {PrivateParser, ProtectedParser, PublicParser} from './public-protected-private';
import {StaticParser} from './static';
import {StrictfpParser} from './strictfp';
import {TypeKeywordParser} from './type-keywords';

export * from './tsscmfv-modifier-keyword';

// @interface -> type keywords
export * from './abstract';                         // abstract: type, constructor (incorrect), method
export * from './as';                               // as: as alias (import), as type (constant or variable)
// assert: assert expression
// boolean -> primitive types
// break: for loop, switch route, while loop, do-while loop
// byte -> primitive types
// case: switch route
// catch: try-catch
// char -> primitive types
// class -> type keywords
// const: reserved
// continue: for loop, while loop, do-while loop
export * from './def';                              // def: type, constructor, method, field, variable
// default: constructor, method, switch route
// do: do-while loop
// double -> primitive types
// else: if-else
// enum -> type keywords
// extends: type
// false -> boolean literal
export * from './final';                            // final: type, constructor (incorrect), method
// finally: try-catch
// float -> primitive types
// for: for loop
// goto: reserved
// if: if-else
// implements: type
// import -> import declaration
// in -> operators, and !in
// instanceof -> operators, and !instanceof
// int -> primitive types
// interface -> type keywords
// long -> primitive types
// native: constructor (incorrect), method
// new: new expression
// non-sealed: type
// null -> null literal
// package -> package declaration
// permits: type
export * from './public-protected-private';         // public protected private
// record -> type keywords
// return: return expression
// sealed: type
// short -> primitive types
export * from './static';                           // static
export * from './strictfp';                         // strictfp
// super
// switch: switch-case
// synchronized: method, synchronize block
// this
// threadsafe: reserved
// throw: throw expression
// throws: constructor method
// trait -> type keywords
// transient: field
// true -> boolean literal
// try: try-catch
// var: field, variable
// void: method
// volatile: field
// while: while loop
// yield: switch route

export * from './type-keywords';                    // @interface, class, enum, interface, record, trait

/**
 * keywords for type, static block, synchronized block, constructor, method, field and variable
 *
 */
export const TsscmfvKeywordParsers = [
	AbstractParser.instance,                                // abstract
	DefParser.instance,                                     // def
	FinalParser.instance,                                   // final
	PrivateParser.instance,                                 // private
	ProtectedParser.instance,                               // protected
	PublicParser.instance,                                  // public
	StaticParser.instance,                                  // static
	StrictfpParser.instance,                                // strictfp
	TypeKeywordParser.instanceAtInterface,                  // @interface
	TypeKeywordParser.instanceClass,                        // class
	TypeKeywordParser.instanceEnum,                         // enum
	TypeKeywordParser.instanceInterface,                    // interface
	TypeKeywordParser.instanceRecord,                       // record
	TypeKeywordParser.instanceTrait                         // trait
];
