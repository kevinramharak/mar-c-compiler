import { BinaryOp, Expression } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseEquality from './parseEquality';;

export default function parseLogicalOr(
    stream: TokenStream
): Expression {
    let expression = parseEquality(stream);
    while (stream.peek().type & TokenType.LOGICAL_AND) {
        const operator = stream.next();
        const right = parseEquality(stream);
        expression = new BinaryOp(operator, expression, right, { token: expression.token, stream });
    }
    return expression;
};
