export type TokenId = number;
export const CompilationUnitTokenId: TokenId = 0;

export type TokenIds = { [CompilationUnitTokenId]: 'CompilationUnit' } & Record<TokenId, string>;
