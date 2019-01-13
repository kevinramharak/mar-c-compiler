
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
            case '^':
                tokify(TokenType.BITWISE_XOR, c);
                continue lexing;
        }

        // multiple letter punctuation
        switch (c) {
            case '=':
                if (!stream.eof) {
                    switch (stream.peek()) {
                        case '=':
                            tokify(TokenType.EQUALS, c + stream.next());
                            continue lexing;
                    }
                }
                tokify(TokenType.ASSIGN, c);
                continue lexing;
            case '-':
                tokify(TokenType.NEGATION, c);
                continue lexing;
            case '!':
                if (!stream.eof) {
                    switch(stream.peek()) {
                        case '=':
                            tokify(TokenType.NOT_EQUALS, c + stream.next());
                            continue lexing;
                    }
                }
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
            case '|':
                if (!stream.eof) {
                    switch (stream.peek()) {
                        case '|':
                            tokify(TokenType.LOGICAL_OR, c + stream.next());
                            continue lexing;
                    }
                }
                tokify(TokenType.BITWISE_OR, c);
                continue lexing;
            case '&':
                if (!stream.eof) {
                    switch(stream.peek()) {
                        case '&':
                            tokify(TokenType.LOGICAL_AND, c + stream.next());
                            continue lexing;
                    }
                }
                tokify(TokenType.BITWISE_AND, c);
                continue lexing;
            case '<':
                if (!stream.eof) {
                    switch(stream.peek()) {
                        case '=':
                            tokify(TokenType.LESS_OR_EQUALS, c + stream.next());
                    }
                }
                tokify(TokenType.LESS_THAN, c);
                continue lexing;
            case '>':
                if (!stream.eof) {
                    switch(stream.peek()) {
                        case '=':
                            tokify(TokenType.GREATER_OR_EQUALS, c + stream.next());
                    }
                }
                tokify(TokenType.GREATER_THAN, c);
                continue lexing;
        }

        // integer literal: https://en.cppreference.com/w/c/language/integer_constant
        // float literal: https://en.cppreference.com/w/c/language/floating_constant
        // #TODO: support integer and float suffixes
        // base 10
        if (is.decimal(c)) {
            const integer = c + stream.while(is.digit);
            const peek = (!stream.eof) ? stream.peek() : false;
            if (peek && peek === '.') {
                const dot = stream.next();
                const float = stream.while((c) => is.digit(c));
                tokify(TokenType.FLOAT_LITERAL, integer + dot + float);
            }
            
            tokify(TokenType.INTEGER_LITERAL, integer);
            continue lexing;
        }

        // #TODO: support float hexadecimal
        if (c === '0') {
            const peek = (!stream.eof) ? stream.peek() : false;
            // hexadecimal
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

        tokify(TokenType.UNKOWN, c);
    }

    return tokens;
};
