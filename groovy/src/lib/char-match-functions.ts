import {CharMatchFunctions} from '@rainbow-ast/core';
import {JavaCharMatchFunctions} from '@rainbow-ast/java-base';

CharMatchFunctions.register('JNameStart', JavaCharMatchFunctions.JNameStart);
CharMatchFunctions.register('JNamePart', JavaCharMatchFunctions.JNamePart);
CharMatchFunctions.register('NotJNamePart', JavaCharMatchFunctions.NotJNamePart);
CharMatchFunctions.register('Bin', JavaCharMatchFunctions.Bin);
CharMatchFunctions.register('Oct', JavaCharMatchFunctions.Oct);
CharMatchFunctions.register('Num', JavaCharMatchFunctions.Num);
CharMatchFunctions.register('Hex', JavaCharMatchFunctions.Hex);
CharMatchFunctions.register('IntSuffix', JavaCharMatchFunctions.IntSuffix);
CharMatchFunctions.register('DecSuffix', JavaCharMatchFunctions.DecSuffix);
CharMatchFunctions.register('DecGSuffix', JavaCharMatchFunctions.DecGSuffix);
