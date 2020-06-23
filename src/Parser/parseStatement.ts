import { ReturnStatement, Statement, Declaration } from '../AST';
import { TokenType, Token } from '../Token';
import { TokenStream } from '../TokenStream';

import parseExpression from './parseExpression';

export default function parseStatement(
    stream: TokenStream
): Statement {
    // create a phony statement to keep the compiler happy
    let statement: Statement = new Statement({ token: new Token(TokenType.UNKOWN, '[phony]') });
    const peek = stream.peek();
    if (peek.type === TokenType.KEYWORD) {
        if (peek.lexeme === 'int') {
            const type = stream.next();
            const name = stream.expect(TokenType.IDENTIFIER);
            let expression;
            if (stream.peek().type !== TokenType.SEMI_COLON) {
                stream.expect(TokenType.ASSIGN);
                expression = parseExpression(stream);
            }
            statement = new Declaration(name.lexeme, expression);
        } else if (peek.lexeme === 'return') {
            // consume 'return'
            stream.next();
            const expression = parseExpression(stream);
            statement = new ReturnStatement(expression);
        } else {
            stream.panic(peek, `keyword 'int'|'return'`);
        }
    } else {
        statement = parseExpression(stream);
    }
    stream.expect(TokenType.SEMI_COLON);
    return statement;
};
