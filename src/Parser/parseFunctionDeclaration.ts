import { FunctionDeclaration, Statement } from '../AST';
import { IToken, Token, TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseStatement from './parseStatement';

export default function parseFunctionDeclaration(
    stream: TokenStream
): FunctionDeclaration {
    const type = stream.expect(TokenType.KEYWORD | TokenType.IDENTIFIER);
    const identifier = stream.expect(TokenType.IDENTIFIER);
    stream.expect(TokenType.LEFT_PAREN);
    // ignore argument list
    while (!stream.eof && stream.peek().type !== TokenType.RIGHT_PAREN) {
        stream.next();
    }
    stream.expect(TokenType.RIGHT_PAREN);
    stream.expect(TokenType.LEFT_BRACE);

    const statements: Statement[] = [];
    while (stream.peek().type !== TokenType.RIGHT_BRACE) {
        const statement = parseStatement(stream);
        statements.push(statement);
    }
    stream.expect(TokenType.RIGHT_BRACE);
    return new FunctionDeclaration(type.lexeme, identifier.lexeme, statements, { token: type, stream });
};
