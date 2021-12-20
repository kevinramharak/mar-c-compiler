import { BinaryOp, Expression } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseRelational from './parseRelational';;

export default function parseEquality(
    stream: TokenStream
): Expression {
    let expression = parseRelational(stream);
    while (stream.peek().type & TokenType.EQUALITY) {
        const operator = stream.next();
        const right = parseRelational(stream);
        expression = new BinaryOp(operator, expression, right, { token: expression.token, stream });
    }
    return expression;
};
