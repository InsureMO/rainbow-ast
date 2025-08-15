// 🆘 cast -> (type) exp
// 🆘 postfix -> i++, i--
// ✅ switch -> keyword
// 🆘 bitnot -> level #1: ~exp
// 🆘 not -> level #1: !exp
// 🆘 power -> level #2: exp1 ** exp2; cannot have newline before **
// 🆘 increase -> level #3: ++exp
// 🆘 decrease -> level #3: --exp
// 🆘 positive -> level #3: +exp
// 🆘 negative -> level #3: -exp
// 🆘 multiple -> level #4: exp1 * exp2
// 🆘 divide -> level #4: exp1 / exp2; cannot have newline before /
// 🆘 modulo -> level #4: exp1 % exp2
// 🆘 add -> level #5: exp1 + exp2
// 🆘 subtract -> level #5: exp1 - exp2
// 🆘 lshift -> level #6: exp1 << exp2
// 🆘 rshift -> level #6: exp1 >> exp2
// 🆘 urshift -> level #6: exp1 >>> exp2
// 🆘 range inclusive -> level #6: exp1 .. exp2
// 🆘 range exclusive left -> level #6: exp1 <.. exp2
// 🆘 range exclusive right -> level #6: exp1 ..< exp2
// 🆘 range exclusive full -> level #6: exp1 <..< exp2
// ✅ as type -> keyword. level #7: exp as type; cannot have newline before as
// 🆘 instanceof -> level #7: exp instanceof type
// 🆘 not instanceof -> level #7: exp !instanceof type
// 🆘 less than or equal -> level #7: exp1 <= exp2
// 🆘 greater than or equal -> level #7: exp1 >= exp2
// 🆘 less than -> level #7: exp1 < exp2
// 🆘 greater than -> level #7: exp1 > exp2
// 🆘 in -> level #7: exp1 in exp2
// 🆘 not in -> level #7: exp1 !in exp2
// 🆘 identical -> level #8: exp1 === exp2
// 🆘 not identical -> level #8: exp1 !== exp2
// 🆘 equal -> level #8: exp1 == exp2
// 🆘 not equal -> level #8: exp1 != exp2
// 🆘 spaceship -> level #8: exp1 <=> exp2
// 🆘 regex find -> level #8.5: exp1 =~ exp2
// 🆘 regex match -> level #8.5: exp1 ==~ exp2
// 🆘 bitand -> level #9: exp1 & exp2
// 🆘 bitxor -> level #10: exp1 ^ exp2
// 🆘 bitor -> level #11: exp1 | exp2
// 🆘 and -> level #12: exp1 && exp2
// 🆘 or -> level #13: exp1 || exp2
// 🆘 ternary expression -> level #14: exp1 ? exp2 : exp3
// 🆘 elvis -> level #14: exp1 ?: exp2
// 🆘 assign -> level #15: exp1 = exp2
// 🆘 power assign -> level #15: exp1 **= exp2
// 🆘 multiple assign -> level #15: exp1 *= exp2
// 🆘 divide assign -> level #15: exp1 /= exp2
// 🆘 modulo assign -> level #15: exp1 %= exp2
// 🆘 add assign -> level #15: exp1 += exp2
// 🆘 sub assign -> level #15: exp1 -= exp2
// 🆘 lshift assign -> level #15: exp1 <<= exp2
// 🆘 rshift assign -> level #15: exp1 >>= exp2
// 🆘 urshift assign -> level #15: exp1 >>>= exp2
// 🆘 bitand assign -> level #15: exp1 &= exp2
// 🆘 bitxor assign -> level #15: exp1 ^= exp2
// 🆘 bitor assign -> level #15: exp1 |= exp2
// 🆘 elvis assign -> level #15: exp1 ?= exp2
// 🆘 multiple assignment / destructure -> level #15: (var1, var2) = [1, 2]; (var1, var2) = obj
