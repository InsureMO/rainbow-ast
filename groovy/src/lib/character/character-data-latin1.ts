import {AbstractCheckableCharacterData} from './abstract-checkable-character-data';

export class CharacterDataLatin1 extends AbstractCheckableCharacterData {
	static instance = new CharacterDataLatin1();

	protected static A: Array<number> = [
		0x4800100F,  //   0   Cc, ignorable
		0x4800100F,  //   1   Cc, ignorable
		0x4800100F,  //   2   Cc, ignorable
		0x4800100F,  //   3   Cc, ignorable
		0x4800100F,  //   4   Cc, ignorable
		0x4800100F,  //   5   Cc, ignorable
		0x4800100F,  //   6   Cc, ignorable
		0x4800100F,  //   7   Cc, ignorable
		0x4800100F,  //   8   Cc, ignorable
		0x5800400F,  //   9   Cc, S, whitespace
		0x5000400F,  //  10   Cc, B, whitespace
		0x5800400F,  //  11   Cc, S, whitespace
		0x6000400F,  //  12   Cc, WS, whitespace
		0x5000400F,  //  13   Cc, B, whitespace
		0x4800100F,  //  14   Cc, ignorable
		0x4800100F,  //  15   Cc, ignorable
		0x4800100F,  //  16   Cc, ignorable
		0x4800100F,  //  17   Cc, ignorable
		0x4800100F,  //  18   Cc, ignorable
		0x4800100F,  //  19   Cc, ignorable
		0x4800100F,  //  20   Cc, ignorable
		0x4800100F,  //  21   Cc, ignorable
		0x4800100F,  //  22   Cc, ignorable
		0x4800100F,  //  23   Cc, ignorable
		0x4800100F,  //  24   Cc, ignorable
		0x4800100F,  //  25   Cc, ignorable
		0x4800100F,  //  26   Cc, ignorable
		0x4800100F,  //  27   Cc, ignorable
		0x5000400F,  //  28   Cc, B, whitespace
		0x5000400F,  //  29   Cc, B, whitespace
		0x5000400F,  //  30   Cc, B, whitespace
		0x5800400F,  //  31   Cc, S, whitespace
		0x6000400C,  //  32   Zs, WS, whitespace
		0x68000018,  //  33   Po, ON
		0x68000018,  //  34   Po, ON
		0x28000018,  //  35   Po, ET
		0x2800601A,  //  36   Sc, ET, currency
		0x28000018,  //  37   Po, ET
		0x68000018,  //  38   Po, ON
		0x68000018,  //  39   Po, ON
		-0x17FFFFEB,  //  40   No, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		-0x17FFFFEA,  //  41   Nl, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		0x68000018,  //  42   Po, ON
		0x20000019,  //  43   Sm, ES
		0x38000018,  //  44   Po, CS
		0x20000014,  //  45   Pd, ES
		0x38000018,  //  46   Po, CS
		0x38000018,  //  47   Po, CS
		0x18003609,  //  48   Nd, EN, identifier part, decimal 16
		0x18003609,  //  49   Nd, EN, identifier part, decimal 16
		0x18003609,  //  50   Nd, EN, identifier part, decimal 16
		0x18003609,  //  51   Nd, EN, identifier part, decimal 16
		0x18003609,  //  52   Nd, EN, identifier part, decimal 16
		0x18003609,  //  53   Nd, EN, identifier part, decimal 16
		0x18003609,  //  54   Nd, EN, identifier part, decimal 16
		0x18003609,  //  55   Nd, EN, identifier part, decimal 16
		0x18003609,  //  56   Nd, EN, identifier part, decimal 16
		0x18003609,  //  57   Nd, EN, identifier part, decimal 16
		0x38000018,  //  58   Po, CS
		0x68000018,  //  59   Po, ON
		-0x17FFFFE7,  //  60   Me, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		0x68000019,  //  61   Sm, ON
		-0x17FFFFE7,  //  62   Me, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		0x68000018,  //  63   Po, ON
		0x68000018,  //  64   Po, ON
		0x00827FE1,  //  65   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  66   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  67   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  68   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  69   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  70   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  71   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  72   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  73   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  74   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  75   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  76   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  77   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  78   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  79   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  80   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  81   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  82   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  83   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  84   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  85   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  86   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  87   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  88   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  89   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		0x00827FE1,  //  90   Lu, L, hasLower (add 32), identifier start, supradecimal 31
		-0x17FFFFEB,  //  91   No, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		0x68000018,  //  92   Po, ON
		-0x17FFFFEA,  //  93   Nl, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		0x6800001B,  //  94   Sk, ON
		0x68005017,  //  95   Pc, ON, underscore
		0x6800001B,  //  96   Sk, ON
		0x00817FE2,  //  97   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  //  98   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  //  99   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 100   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 101   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 102   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 103   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 104   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 105   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 106   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 107   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 108   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 109   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 110   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 111   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 112   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 113   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 114   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 115   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 116   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 117   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 118   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 119   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 120   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 121   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		0x00817FE2,  // 122   Ll, L, hasUpper (subtract 32), identifier start, supradecimal 31
		-0x17FFFFEB,  // 123   No, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		0x68000019,  // 124   Sm, ON
		-0x17FFFFEA,  // 125   Nl, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		0x68000019,  // 126   Sm, ON
		0x4800100F,  // 127   Cc, ignorable
		0x4800100F,  // 128   Cc, ignorable
		0x4800100F,  // 129   Cc, ignorable
		0x4800100F,  // 130   Cc, ignorable
		0x4800100F,  // 131   Cc, ignorable
		0x4800100F,  // 132   Cc, ignorable
		0x5000100F,  // 133   Cc, B, ignorable
		0x4800100F,  // 134   Cc, ignorable
		0x4800100F,  // 135   Cc, ignorable
		0x4800100F,  // 136   Cc, ignorable
		0x4800100F,  // 137   Cc, ignorable
		0x4800100F,  // 138   Cc, ignorable
		0x4800100F,  // 139   Cc, ignorable
		0x4800100F,  // 140   Cc, ignorable
		0x4800100F,  // 141   Cc, ignorable
		0x4800100F,  // 142   Cc, ignorable
		0x4800100F,  // 143   Cc, ignorable
		0x4800100F,  // 144   Cc, ignorable
		0x4800100F,  // 145   Cc, ignorable
		0x4800100F,  // 146   Cc, ignorable
		0x4800100F,  // 147   Cc, ignorable
		0x4800100F,  // 148   Cc, ignorable
		0x4800100F,  // 149   Cc, ignorable
		0x4800100F,  // 150   Cc, ignorable
		0x4800100F,  // 151   Cc, ignorable
		0x4800100F,  // 152   Cc, ignorable
		0x4800100F,  // 153   Cc, ignorable
		0x4800100F,  // 154   Cc, ignorable
		0x4800100F,  // 155   Cc, ignorable
		0x4800100F,  // 156   Cc, ignorable
		0x4800100F,  // 157   Cc, ignorable
		0x4800100F,  // 158   Cc, ignorable
		0x4800100F,  // 159   Cc, ignorable
		0x3800000C,  // 160   Zs, CS
		0x68000018,  // 161   Po, ON
		0x2800601A,  // 162   Sc, ET, currency
		0x2800601A,  // 163   Sc, ET, currency
		0x2800601A,  // 164   Sc, ET, currency
		0x2800601A,  // 165   Sc, ET, currency
		0x6800001C,  // 166   So, ON
		0x68000018,  // 167   Po, ON
		0x6800001B,  // 168   Sk, ON
		0x6800001C,  // 169   So, ON
		-0xFFFF8FFB,  // 170   Sk, hasUpper (subtract 511), hasLower (add 511), hasTitle, supradecimal 31
		-0x17FFFFE3,  // 171   Lt, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		0x68000019,  // 172   Sm, ON
		0x48001010,  // 173   Cf, ignorable
		0x6800001C,  // 174   So, ON
		0x6800001B,  // 175   Sk, ON
		0x2800001C,  // 176   So, ET
		0x28000019,  // 177   Sm, ET
		0x1800060B,  // 178   No, EN, decimal 16
		0x1800060B,  // 179   No, EN, decimal 16
		0x6800001B,  // 180   Sk, ON
		0x07FD7002,  // 181   Ll, L, hasUpper (subtract 511), identifier start
		0x68000018,  // 182   Po, ON
		0x68000018,  // 183   Po, ON
		0x6800001B,  // 184   Sk, ON
		0x1800050B,  // 185   No, EN, decimal 8
		-0xFFFF8FFB,  // 186   Sk, hasUpper (subtract 511), hasLower (add 511), hasTitle, supradecimal 31
		-0x17FFFFE2,  // 187   Ll, hasUpper (subtract 511), hasLower (add 511), hasTitle, identifier start, supradecimal 31
		0x6800080B,  // 188   No, ON, strange
		0x6800080B,  // 189   No, ON, strange
		0x6800080B,  // 190   No, ON, strange
		0x68000018,  // 191   Po, ON
		0x00827001,  // 192   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 193   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 194   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 195   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 196   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 197   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 198   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 199   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 200   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 201   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 202   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 203   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 204   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 205   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 206   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 207   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 208   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 209   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 210   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 211   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 212   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 213   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 214   Lu, L, hasLower (add 32), identifier start
		0x68000019,  // 215   Sm, ON
		0x00827001,  // 216   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 217   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 218   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 219   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 220   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 221   Lu, L, hasLower (add 32), identifier start
		0x00827001,  // 222   Lu, L, hasLower (add 32), identifier start
		0x07FD7002,  // 223   Ll, L, hasUpper (subtract 511), identifier start
		0x00817002,  // 224   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 225   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 226   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 227   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 228   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 229   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 230   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 231   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 232   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 233   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 234   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 235   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 236   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 237   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 238   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 239   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 240   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 241   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 242   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 243   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 244   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 245   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 246   Ll, L, hasUpper (subtract 32), identifier start
		0x68000019,  // 247   Sm, ON
		0x00817002,  // 248   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 249   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 250   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 251   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 252   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 253   Ll, L, hasUpper (subtract 32), identifier start
		0x00817002,  // 254   Ll, L, hasUpper (subtract 32), identifier start
		0x061D7002   // 255   Ll, L, hasUpper (subtract 391), identifier start
	];

	protected getProperties(codePoint: number): number {
		return CharacterDataLatin1.A[this.javaCastToChar(codePoint)];
	}
}