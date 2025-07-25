import {StandaloneSymbolParsers} from '../common-token';

/** for single-quote string literal, excludes ', \ */
export const SsqSLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['\'', '\\'].includes(p.firstChar));
/** for single-quote string literal, excludes \ */
export const TsqSLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['\\'].includes(p.firstChar));
/** excludes ", \, $ */
export const GsLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['"', '\\', '$'].includes(p.firstChar));
/** excludes /, \, $ */
export const SGsLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['/', '\\', '$'].includes(p.firstChar));
/** excludes $ */
export const DSGsLStandaloneSymbolParsers = StandaloneSymbolParsers.filter(p => !['$'].includes(p.firstChar));
