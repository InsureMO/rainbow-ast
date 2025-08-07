#!/usr/bin/env groovy
  		#
// {}[]()<>/\~@#$%^&*?-+=_|'"`.,:; sl	cmt
/*
*/
// number test
0
01
0b01i
0XFFG
.1f
1.7D
2e+5g
2.5E-3_1
1__2.5_6F
// string test
'abc'
' 	{}[]()<>/~@#$%^&*?-+=_|"`.,:;'
'\0\12\345\89\u\u0\u12\u345\uabcd\c\ '
'\
''' 	{}[]()<>/~@#$%^&*?-+=_|'"`.,:;
\0\12\345\89\u\u0\u12\u345\uabcd\ \c
abc\
\
'''
"abc"
" 	{}[]()<>/~@#%^&*?-+=_|'`.,:;"
"\0\12\345\89\u\u0\u12\u345\uabcd\c\ "
"\
""" 	{}[]()<>/~@#%^&*?-+=_|'"`.,:;
\0\12\345\89\u\u0\u12\u345\uabcd\ \c
abc\
\
"""
/abc/
/ 	{}[]()<>\~@#$%^&*?-+=_|'"`.,:;/
/\/\u\u0\u12\u345\uabcd/
/\
/
$/abc/$
$/ 	{}[]()<>\~@#$%^&*?-+=_|'"`.,:;/$
$/$/$$\u\u0\u12\u345\uabcd/$
$/\
/$
"$a$a.$a.b$$$_$1$$ "
"""$a$a.$a.b$$$_$1$$ """
"${}${ }"
"""${}${ }"""
/$a$a.$a.b$$$_$1$$ a${}${ }$/
$/abc $$$abc $abc/$
$/abc $abc $$$abc/$
$/abc $$${abc} $abc/$
$/abc ${abc} $$${abc}/$
$/$/$abc $abc/$
$/$abc $/$abc/$
$/$abc $/$$$$$abc/$
$/$/${abc} $abc/$
$/$abc $/${abc}/$
$/$abc $/$$${abc}/$
// package declaration
package java.util
package	java./*
*/util;
package java..;
package java.util.
package java util
package as.def.var.record.sealed.trait.permits.yield.in
// import declaration
import java.lang.Integer
import	java. lang.Integer as I
import java.lang.*
import static java./*
*/lang.Integer.MIN_VALUE as MIN;
import static java.lang.Integer.*
import java..;
import java.lang.
import java lang
import java.lang.Integer as as
import as.def.var.record.sealed.trait.permits.yield.in.Integer as record
// type declaration #1
class record;
class trait;
class as;
class yield;
public protected private
abstract abstract
final final
strictfp strictfp  // abc
static /*
*/ static
def
class @interface interface enum record trait A;
public class A extends b.C extends implements implements d.E permits f.G, i.H permits;
class A {}
public sealed class B extends C implements D permits E, F {}
static static {}
synchronized () {}
// method declaration #1
void test() {}
boolean void test();
public java.util.List test() throws IOException, e.E {}
public void /private/() {}
