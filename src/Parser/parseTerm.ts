import { BinaryOp, Expression } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseFactor from './parseFactor';

export default function parseTerm(
    stream: TokenStream
): Expression {
    let factor = parseFactor(stream);
    while (stream.peek().type & (TokenType.MULTIPLICATION | TokenType.DIVISION)) {
        const operator = stream.next();
        const right = parseFactor(stream);
        factor = new BinaryOp(operator.lexeme, factor, right);
    }
    return factor;
};
