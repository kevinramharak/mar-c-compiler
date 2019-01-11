import { IntegerConstant, UnaryOp, Expression } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseExpression from './parseExpression';

export default function parseFactor(
    stream: TokenStream
): Expression {
    const peek = stream.peek();

    if (peek.type === TokenType.LEFT_PAREN) {
        stream.next();
        const expression = parseExpression(stream);
        stream.expect(TokenType.RIGHT_PAREN);
        return new Expression(expression);
    } else if (peek.type & TokenType.UNARY_OP) {
        const unaryOp = stream.next();
        const factor = parseFactor(stream);
        return new UnaryOp(unaryOp.lexeme, factor);
    } else {
        const constant = stream.expect(TokenType.INTEGER_LITERAL);
        return new IntegerConstant(Number.parseInt(constant.lexeme));
    }
};
