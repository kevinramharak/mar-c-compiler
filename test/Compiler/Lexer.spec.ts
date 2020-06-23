import { strict as assert } from 'assert';
import { lex, keywords } from '../../src/Lexer';
import { TokenType } from '../../src/Token';

describe('Lexer', () => {
    it('should take a string as input and return an array as output', () => {
        const input = "";
        const output = lex(input);
        assert(Array.isArray(output), `expected 'output' to be an array`);
    });
    it('should return the correct tokens for each input', () => {
        type InputToTokenMap = { [input: string]: TokenType };
        const map: InputToTokenMap = {
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
            '\u{2020}': TokenType.UNKOWN,
        };

        keywords.forEach(keyword => map[keyword] = TokenType.KEYWORD);

        const output: InputToTokenMap = {};
        Object.entries(map).reduce((map, [input, _]) => {
            const tokens = lex(input);
            assert.equal(tokens.length, 1, `expected length of 'lex("${input}")' to be 1`);
            map[input] = tokens[0].type;
            return map;
        }, output);
        assert.deepEqual(map, output, `expected each token to map to the correct 'TokenType'`);
    });
});
