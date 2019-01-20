import { Expression, Assignment, VariableReference } from '../AST';
import { TokenStream } from '../TokenStream';

import { parseLogicalOr } from '.';
import { TokenType } from '../Token';

export default function parseExpression(
    stream: TokenStream
): Expression {
    let expression;
    if (stream.peek().type === TokenType.IDENTIFIER && stream.peek(1).type === TokenType.ASSIGN) {
        const name = stream.next();
        // assign
        stream.next();
        const inner = parseExpression(stream);
        expression = new Assignment(name.lexeme, inner);
    } else {
        expression = parseLogicalOr(stream);
    }
    return expression as Expression;
};
