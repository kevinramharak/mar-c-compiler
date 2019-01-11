import { ReturnStatement, Statement } from '../AST';
import { TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseExpression from './parseExpression';

export default function parseStatement(
    stream: TokenStream
): Statement {
    const keyword = stream.expect(TokenType.KEYWORD);
    if (keyword.lexeme !== 'return') {
        stream.panic(keyword, 'return');
    }
    const expression = parseExpression(stream);
    stream.expect(TokenType.SEMI_COLON);
    return new ReturnStatement(expression);
};
