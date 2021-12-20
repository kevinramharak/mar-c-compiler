import { IntegerConstant, UnaryOp, Expression, VariableReference } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import { parseExpression } from '.';

export default function parseFactor(
    stream: TokenStream
): Expression {
    let expression;
    const peek = stream.peek();

    if (peek.type === TokenType.LEFT_PAREN) {
        stream.next();
        expression = parseExpression(stream);
        stream.expect(TokenType.RIGHT_PAREN);
    } else if (peek.type & TokenType.UNARY_OP) {
        const operator = stream.next();
        const factor = parseFactor(stream,);
        expression = new UnaryOp(operator, factor, { token: operator, stream });
    } else if (peek.type === TokenType.IDENTIFIER) {
        const name = stream.next();
        expression = new VariableReference(name.lexeme, { token: name, stream});
    } else {
        const constant = stream.expect(TokenType.INTEGER_LITERAL);
        expression = new IntegerConstant(Number.parseInt(constant.lexeme), { token: constant, stream });
    }
    return expression;
};
