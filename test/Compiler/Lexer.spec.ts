import mocha from 'mocha';
import assert from 'assert';

import { lex } from '../../src/Lexer';
import { TokenType } from '../../src/Token';
import { keywords } from '../../src/Lexer';

describe('Lexer', () => {
    it('should take a string as input and return an array as output', () => {
        const input = "";
        const output = lex(input);
        assert(Array.isArray(output));
    });
    it('should return the correct tokens for each example input', () => {
        const map: { [input: string]: TokenType } = {
            '1': TokenType.INTEGER_LITERAL,
            '01': TokenType.INTEGER_LITERAL,
            '0x1': TokenType.INTEGER_LITERAL,
//            '.1': TokenType.FLOAT_LITERAL,
            '1.1': TokenType.FLOAT_LITERAL,
            '+': TokenType.ADDITION,
            '-': TokenType.NEGATION,
            '==': TokenType.EQUALS,
            '!=': TokenType.NOT_EQUALS,
            '>': TokenType.GREATER_THAN,
            '>=': TokenType.GREATER_OR_EQUALS,
            '<': TokenType.LESS_THAN,
            '<=': TokenType.LESS_OR_EQUALS,
            '{': TokenType.LEFT_BRACE,
            '}': TokenType.RIGHT_BRACE,
            '(': TokenType.LEFT_PAREN,
            ')': TokenType.RIGHT_PAREN,
            ';': TokenType.SEMI_COLON,
            '^': TokenType.BITWISE_XOR,
            '~': TokenType.BITWISE_NOT,
            '&': TokenType.BITWISE_AND,
            '|': TokenType.BITWISE_OR,
            '&&': TokenType.LOGICAL_AND,
            '||': TokenType.LOGICAL_OR,
            '!': TokenType.LOGICAL_NOT,
            '*': TokenType.MULTIPLICATION,
            '/': TokenType.DIVISION,
        }
        for (const input in map) {
            const token = lex(input)[0];
            assert(token, `failed to parse '${input}'`);
            assert(token.type === map[input], `parsed '${input}' into type '${TokenType[token.type]}', expected '${TokenType[map[input]]}'`);
        }
        for (const keyword of keywords) {
            const token = lex(keyword)[0];
            assert(token, `failed to parse keyword: '${keyword}'`);
            assert(token.type === TokenType.KEYWORD, `parsed '${keyword}' into type '${TokenType[token.type]}', expected '${TokenType[TokenType.KEYWORD]}'`);
        }
    });
});
