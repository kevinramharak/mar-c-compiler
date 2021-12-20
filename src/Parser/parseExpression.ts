import { Expression, Assignment, VariableReference } from '../AST';
import { TokenStream } from '../TokenStream';

import parseLogicalOr from './parseLogicalOr';;
import { TokenType } from '../Token';

export default function parseExpression(
    stream: TokenStream
): Expression {
    let expression;
    if (stream.peek().type === TokenType.IDENTIFIER && stream.peek(1).type === TokenType.ASSIGN) {
        const name = stream.expect(TokenType.IDENTIFIER);
        stream.expect(TokenType.ASSIGN);
        const inner = parseExpression(stream);
        expression = new Assignment(name.lexeme, inner, { token: name, stream });
    } else {
        expression = parseLogicalOr(stream);
    }
    return expression;
};
