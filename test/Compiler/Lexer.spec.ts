import mocha from 'mocha';
import assert from 'assert';

import { lex } from '../../src/Lexer';

describe('Lexer', () => {
    it('should take a string as input and return an array as output', () => {
        const input = "";
        const output = lex(input);
        assert(Array.isArray(output));
    });
});
