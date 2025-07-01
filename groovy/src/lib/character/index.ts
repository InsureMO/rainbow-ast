// The following code is copied from the JDK and moderately modified while maintaining the original logic.

export * from './character-data';
export * from './abstract-character-data';
export * from './abstract-checkable-character-data';
export * from './character';

// the X, Y and A values are copied from results of following java code:
// List.of(
// 	"java.lang.CharacterData00",
// 	"java.lang.CharacterData01",
// 	"java.lang.CharacterData02",
// 	"java.lang.CharacterData0E"
// ).stream().forEach(className -> {
// 	try {//1207963663, 18432, 4111
// 		Class cls = Class.forName(className);
// 		System.out.println(cls.getSimpleName());
// 		Field f = cls.getDeclaredField("X");
// 		f.setAccessible(true);
// 		char[] xValue = (char[]) f.get(null);
// 		int[] xIntValue = new int[xValue.length];
// 		for (int i = 0; i < xValue.length; i++) {
// 			xIntValue[i] = xValue[i];
// 		}
// 		System.out.println("static X: Readonly<Array<number>> = " + Arrays.toString(xIntValue) + ";");
// 		f = cls.getDeclaredField("Y");
// 		f.setAccessible(true);
// 		char[] yValue = (char[]) f.get(null);
// 		int[] yIntValue = new int[yValue.length];
// 		for (int i = 0; i < yValue.length; i++) {
// 			yIntValue[i] = yValue[i];
// 		}
// 		System.out.println("static Y: Readonly<Array<number>> = " + Arrays.toString(yIntValue) + ";");
// 		f = cls.getDeclaredField("A");
// 		f.setAccessible(true);
// 		int[] aValue = (int[]) f.get(null);
// 		System.out.println("static A: Readonly<Array<number>> = " + Arrays.toString(aValue) + ";");
// 	} catch (ClassNotFoundException e) {
// 		throw new RuntimeException(e);
// 	} catch (NoSuchFieldException e) {
// 		throw new RuntimeException(e);
// 	} catch (IllegalAccessException e) {
// 		throw new RuntimeException(e);
// 	}
// });

// export * from './character-data-latin1';
// export * from './character-data-00';
// export * from './character-data-01';
// export * from './character-data-02';
// export * from './character-data-0e';
// export * from './character-data-private-use';
// export * from './character-data-undefined';
// export * from './character-data-selector';
