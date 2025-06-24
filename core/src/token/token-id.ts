/** >= 0*/
export type TokenId = number;
/** token id of compilation unit always be 0 */
export const CompilationUnitTokenId: TokenId = 0;

export type TokenIds = { [CompilationUnitTokenId]: 'CompilationUnit' } & Record<TokenId, string>;
