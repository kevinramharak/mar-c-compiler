
import is from './is';

import { StringStream } from '../StringStream';
import { IToken, Token, TokenType } from '../Token';

export default function lex(input: string | StringStream, filename?: string): IToken[] {
    const stream: StringStream = !(input instanceof StringStream) ? new StringStream(input) : input;
    
    const tokens: IToken[] = [];
    const info = {
        name: filename || '[anonymous]',
        line: 1,
        col: 0,
    };

    // helper to keep track of 'info.col'
    const next = () => { info.col++; return stream.next()};

    lexing: while(!stream.eof) {
        const createToken = (type: TokenType, lexeme: string) => tokens.push(new Token(type, lexeme, { name: info.name, line: info.line, col: info.col }));
        const character = next();

        // ignore whitespace
        switch (character) {
            case '\n':
                info.line++;
                info.col = 1;
            case '\r':
                // TODO: support all line endings
            case '\t':
            case '\v':
            case ' ':
                continue lexing;
        }

        // one letter punctuation
        switch (character) {
            case '{':
                createToken(TokenType.LEFT_BRACE, character);
                continue lexing;
            case '}':
                createToken(TokenType.RIGHT_BRACE, character);
                continue lexing;
            case '(':
                createToken(TokenType.LEFT_PAREN, character);
                continue lexing;
            case ')':
                createToken(TokenType.RIGHT_PAREN, character);
                continue lexing;
            case ';':
                createToken(TokenType.SEMI_COLON, character);
                continue lexing;
            case '~':
                createToken(TokenType.BITWISE_NOT, character);
                continue lexing;
            case '^':
                createToken(TokenType.BITWISE_XOR, character);
                continue lexing;
            case '%':
                createToken(TokenType.MODULO, character);
                continue lexing;
            case ':':
                createToken(TokenType.COLON, character);
                continue lexing;
            case '?':
                createToken(TokenType.QUESTION_MARK, character);
                continue lexing;
        }

        // multiple letter punctuation
        switch (character) {
            case '=':
                if (!stream.eof) {
                    switch (stream.peek()) {
                        case '=':
                            createToken(TokenType.EQUALS, character + next());
                            continue lexing;
                    }
                }
                createToken(TokenType.ASSIGN, character);
                continue lexing;
            case '-':
                createToken(TokenType.NEGATION, character);
                continue lexing;
            case '!':
                if (!stream.eof) {
                    switch(stream.peek()) {
                        case '=':
                            createToken(TokenType.NOT_EQUALS, character + next());
                            continue lexing;
                    }
                }
                createToken(TokenType.LOGICAL_NOT, character);
                continue lexing;
            case '+':
                createToken(TokenType.ADDITION, character);
                continue lexing;
            case '*':
                createToken(TokenType.MULTIPLICATION, character);
                continue lexing;
            case '/':
                createToken(TokenType.DIVISION, character);
                continue lexing;
            case '|':
                if (!stream.eof) {
                    switch (stream.peek()) {
                        case '|':
                            createToken(TokenType.LOGICAL_OR, character + next());
                            continue lexing;
                    }
                }
                createToken(TokenType.BITWISE_OR, character);
                continue lexing;
            case '&':
                if (!stream.eof) {
                    switch(stream.peek()) {
                        case '&':
                            createToken(TokenType.LOGICAL_AND, character + next());
                            continue lexing;
                    }
                }
                createToken(TokenType.BITWISE_AND, character);
                continue lexing;
            case '<':
                if (!stream.eof) {
                    switch(stream.peek()) {
                        case '=':
                            createToken(TokenType.LESS_OR_EQUALS, character + next());
                            continue lexing;
                    }
                }
                createToken(TokenType.LESS_THAN, character);
                continue lexing;
            case '>':
                if (!stream.eof) {
                    switch(stream.peek()) {
                        case '=':
                            createToken(TokenType.GREATER_OR_EQUALS, character + next());
                        continue lexing;
                    }
                }
                createToken(TokenType.GREATER_THAN, character);
                continue lexing;
        }

        // integer literal: https://en.cppreference.com/w/c/language/integer_constant
        // float literal: https://en.cppreference.com/w/c/language/floating_constant
        // #TODO: support integer and float suffixes
        // base 10
        if (is.decimal(character)) {
            const integer = character + stream.while(is.digit);
            if (!stream.eof) {
                const peek = stream.peek();
                if (peek === '.') {
                    const dot = next();
                    const float = stream.while(is.digit);
                    createToken(TokenType.FLOAT_LITERAL, integer + dot + float);
                    continue lexing;
                }
            } 
            createToken(TokenType.INTEGER_LITERAL, integer);
            continue lexing;
        }

        // #TODO: support float hexadecimal
        if (character === '0') {
            const peek = (!stream.eof) ? stream.peek() : false;
            // hexadecimal
            if (peek && (peek === 'x' || peek === 'X')) {
                const x = next();
                createToken(TokenType.INTEGER_LITERAL, character + x + stream.while(is.hex));
            }
            // octal
            else {
                createToken(TokenType.INTEGER_LITERAL, character + stream.while(is.octal));
            }
            continue lexing;
        }

        // identifiers and keywords
        if (is.identifierStart(character)) {
            const lexeme = character + stream.while(is.identifier);
            const type = (is.keyword(lexeme)) ? TokenType.KEYWORD : TokenType.IDENTIFIER;
            createToken(type, lexeme);
            continue lexing;
        }

        createToken(TokenType.UNKOWN, character);
    }

    return tokens;
};
