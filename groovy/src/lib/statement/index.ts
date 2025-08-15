// 🆘 assert -> keyword
// 🆘 block -> code block, closure
// ✅ break -> keyword
// ✅ continue -> keyword
// 🆘 do-while -> keyword
// 🆘 for -> keyword
// 🆘 if-else -> keyword
// 🆘 label -> identifier: statement
// 🆘 variable -> tsscmfv, partial done
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
