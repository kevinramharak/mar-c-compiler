import { BinaryOp, Expression } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseTerm from './parseTerm';

export default function parseExpression(
    stream: TokenStream
): Expression {
    let term = parseTerm(stream);
    while (stream.peek().type & (TokenType.ADDITION | TokenType.NEGATION)) {
        const operator = stream.next();
        const right = parseTerm(stream);
        term = new BinaryOp(operator.lexeme, term, right);
    }
    return term;
};
