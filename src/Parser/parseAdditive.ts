import { Expression, BinaryOp } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import { parseTerm } from '.';

export default function parseAdditive(
    stream: TokenStream
): Expression {
    let expression = parseTerm(stream);
    while (stream.peek().type & TokenType.ADDITIVE) {
        const operator = stream.next();
        const right = parseTerm(stream);
        expression = new BinaryOp(operator, expression, right);
    }
    return expression;
};
