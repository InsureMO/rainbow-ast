import {MLCommentParser} from './ml-comment';
import {SLCommentParser} from './sl-comment';

export * from './sl-comment';
export * from './ml-comment';

export const CommentParsers = [SLCommentParser.instance, MLCommentParser.instance];
