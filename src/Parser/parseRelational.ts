import { BinaryOp, Expression } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseAdditive from './parseAdditive';;

export default function parseLogicalOr(
    stream: TokenStream
): Expression {
    let expression = parseAdditive(stream);
    while (stream.peek().type & TokenType.RELATIONAL) {
        const operator = stream.next();
        const right = parseAdditive(stream);
        expression = new BinaryOp(operator, expression, right, { token: expression.token, stream });
    }
    return expression;
};
