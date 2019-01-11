import { FunctionDeclaration } from '../AST';
import { IToken, Token, TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseStatement from './parseStatement';

export default function parseFunctionDeclaration(
    stream: TokenStream
): FunctionDeclaration {
    const type = stream.expect(TokenType.KEYWORD | TokenType.IDENTIFIER);
    const identifier = stream.expect(TokenType.IDENTIFIER);
    stream.expect(TokenType.LEFT_PAREN);
    stream.expect(TokenType.RIGHT_PAREN);
    stream.expect(TokenType.LEFT_BRACE);
    const statement = parseStatement(stream);
    stream.expect(TokenType.RIGHT_BRACE);
    return new FunctionDeclaration(type.lexeme, identifier.lexeme, statement, { token: type, stream });
};
