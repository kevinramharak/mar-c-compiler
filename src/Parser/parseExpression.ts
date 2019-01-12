import { Expression } from '../AST';
import { TokenStream } from '../TokenStream';

import { parseLogicalOr } from '.';

export default function parseExpression(
    stream: TokenStream
): Expression {
    return parseLogicalOr(stream);
};
