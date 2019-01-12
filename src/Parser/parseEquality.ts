import { BinaryOp, Expression } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import { parseRelational } from '.';

export default function parseLogicalOr(
    stream: TokenStream
): Expression {
    let expression = parseRelational(stream);
    while (stream.peek().type & TokenType.EQUALITY) {
        const operator = stream.next();
        const right = parseRelational(stream);
        expression = new BinaryOp(operator.lexeme, expression, right);
    }
    return expression;
};
