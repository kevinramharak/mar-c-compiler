import { BinaryOp, Expression } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import { parseLogicalAnd } from '.';

export default function parseLogicalOr(
    stream: TokenStream
): Expression {
    let expression = parseLogicalAnd(stream);
    while (stream.peek().type & TokenType.LOGICAL_OR) {
        const operator = stream.next();
        const right = parseLogicalAnd(stream);
        expression = new BinaryOp(operator, expression, right, { token: expression.token, stream });
    }
    return expression;
};
