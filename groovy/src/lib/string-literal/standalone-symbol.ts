import {StandaloneSymbolParsers} from '../common-token';

/** for single-quote string literal, excludes ', \ */
export const SsqSLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['\'', '\\'].includes(p.firstChar));
/** for triple single-quotes string literal, excludes \ */
export const TsqSLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['\\'].includes(p.firstChar));
/** for double-quote gstring literal, excludes ", \, $ */
export const SdqGsLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['"', '\\', '$'].includes(p.firstChar));
/** for triple double-quotes gstring literal, excludes ", \, $ */
export const TdqGsLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['\\', '$'].includes(p.firstChar));
/** for slashy gstring literal, excludes /, \, $ */
export const SGsLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['/', '\\', '$'].includes(p.firstChar));
/** for dollar slashy gstring literal, excludes $ */
export const DsGsLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['$'].includes(p.firstChar));
