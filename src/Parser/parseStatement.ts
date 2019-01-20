import { ReturnStatement, Statement } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseExpression from './parseExpression';
import Declaration from '../AST/Declaration';

export default function parseStatement(
    stream: TokenStream
): Statement {
    let statement;
    const peek = stream.peek();
    if (peek.type === TokenType.KEYWORD) {
        if (peek.lexeme === 'int') {
            const type = stream.next();
            const name = stream.expect(TokenType.IDENTIFIER);
            let expression;
            if (stream.peek().type != TokenType.SEMI_COLON) {
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
    return statement as Statement;
};
