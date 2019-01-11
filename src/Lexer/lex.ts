
import is from './is';

import { FileInfo, IFileInfo } from '../FileInfo';
import { StringStream } from '../StringStream';
import { IToken, Token, TokenType } from '../Token';

export default function lex(stream: string | StringStream, filename?: string): IToken[] {
    stream = (typeof stream === 'string') ? new StringStream(stream) : stream;
    
    const tokens: IToken[] = [];
    const info = new FileInfo(stream, filename);

    // tslint:disable-next-line no-shadowed-variable
    const tokenHelper = (type: TokenType, lexeme: string, info: IFileInfo) => new Token(type, lexeme, info);

    lexing: while(!stream.eof) {
        const currentInfo = { name: info.name, line: info.line, col: info.col };
        const tokify = (type: TokenType, lexeme: string) => tokens.push(tokenHelper(type, lexeme, currentInfo));
        const c = stream.next();

        // ignore whitespace
        switch (c) {
            case '\r':
            case '\n':
            case '\t':
            case '\v':
            case ' ':
                continue lexing;
        }

        // one letter punctuation
        switch (c) {
            case '{':
                tokify(TokenType.LEFT_BRACE, c);
                continue lexing;
            case '}':
                tokify(TokenType.RIGHT_BRACE, c);
                continue lexing;
            case '(':
                tokify(TokenType.LEFT_PAREN, c);
                continue lexing;
            case ')':
                tokify(TokenType.RIGHT_PAREN, c);
                continue lexing;
            case ';':
                tokify(TokenType.SEMI_COLON, c);
                continue lexing;
            case '~':
                tokify(TokenType.BITWISE_COMPLEMENT, c);
                continue lexing;
        }

        // multiple letter punctuation
        switch (c) {
            case '-':
                tokify(TokenType.NEGATION, c);
                continue lexing;
            case '!':
                tokify(TokenType.LOGICAL_NOT, c);
                continue lexing;
            case '+':
                tokify(TokenType.ADDITION, c);
                continue lexing;
            case '*':
                tokify(TokenType.MULTIPLICATION, c);
                continue lexing;
            case '/':
                tokify(TokenType.DIVISION, c);
                continue lexing;
        }

        // integer literal: https://en.cppreference.com/w/c/language/integer_constant
        // TODO: refactor to a function, also put 'ull' suffixes logic in that function
        if (is.decimal(c)) {
            tokify(TokenType.INTEGER_LITERAL, c + stream.while(is.digit));
            continue lexing;
        }

        if (c === '0') {
            const peek = (!stream.eof) ? stream.peek() : false;
            // hex
            if (peek && (peek === 'x' || peek === 'X')) {
                const x = stream.next();
                tokify(TokenType.INTEGER_LITERAL, c + x + stream.while(is.hex));
            }
            // octal
            else {
                tokify(TokenType.INTEGER_LITERAL, c + stream.while(is.octal));
            }
            continue lexing;
        }

        // identifiers and keywords
        if (is.identifierStart(c)) {
            const lexeme = c + stream.while(is.identifier);
            const type = (is.keyword(lexeme)) ? TokenType.KEYWORD : TokenType.IDENTIFIER;
            tokify(type, lexeme);
            continue lexing;
        }
    }

    return tokens;
};
