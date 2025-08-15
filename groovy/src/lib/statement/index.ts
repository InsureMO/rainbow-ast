// 🆘 assert -> keyword
// 🆘 block -> code block, closure
// ✅ break -> keyword
// ✅ continue -> keyword
// 🆘 do-while -> keyword
// 🆘 for -> keyword
// 🆘 if-else -> keyword
// 🆘 label -> identifier: statement?
// 🆘 variable declaration -> tsscmfv, partial done
// 🆘 return -> keyword
// ✅ semicolon -> common
// ✅ switch-case -> keyword
// ✅ synchronized block -> tsscmfv
// 🆘 throw -> keyword
// ✅ try-catch -> keyword
// 🆘 while -> keyword
// 🆘 yield -> keyword

// what follows is either a normal argument, parens,
// an appended block, an index operation, or nothing
// parens (a b already processed):
//      a b c() d e -> a(b).c().d(e)
//      a b c()() d e -> a(b).c().call().d(e)
// index (a b already processed):
//      a b c[x] d e -> a(b).c[x].d(e)
//      a b c[x][y] d e -> a(b).c[x][y].d(e)
// block (a b already processed):
//      a b c {x} d e -> a(b).c({x}).d(e)
//
// parens/block completes method call
// index makes method call to property get with index

/**
 * 1. after keywords assert/return/throw/yield, the groovy dsl (using whitespace instead of dot) is not supported,
 *    unless they are within a single parenthesized block.
 * 2. to distinguish between a field/variable declaration and an expression:
 *    - A[.B[...[.N]]] C[, D[...[, N]]] -> field/variable declaration
 *    - A[.B[...[.N]]] C[, D[...[, N]]] E -> expression
 *    the difference is:
 *    - a field/variable declaration has only one whitespace (whitespace around commas is not counted),
 *    - an expression has at least two whitespaces.
 */
