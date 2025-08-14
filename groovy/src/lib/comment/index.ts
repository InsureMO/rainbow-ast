import {MLCommentParser} from './ml-comment-parser';
import {SLCommentParser} from './sl-comment-parser';

export * from './sl-comment-parser';
export * from './ml-comment-parser';

export const CommentParsers = [SLCommentParser.instance, MLCommentParser.instance];
