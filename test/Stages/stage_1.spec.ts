import * as mocha from 'mocha';
import assert from 'assert';

import pipeline from '../../src/pipeline';

const template = (value: string) => `\
main:
  MOV A, ${value}
  ret
`;

const extractReturnValue = (content: string) => {
    return /return\W+([0-9]+)\W*;/g.exec(content);
};

const PREFIX = './samples/stage_1';
const INVALID = `${PREFIX}/invalid`;
const VALID = `${PREFIX}/valid`;

const test = (name: string) => {
    return () => {
        const result = pipeline(`${name}`);

        assert(!result.error);
        assert(result.content);

        const regexResult = extractReturnValue(result.content!)![1];

        assert(regexResult);

        const asm = template(regexResult);
        assert(result.asm === asm, `\n${result.asm} === \n${asm}`);
    }
}

describe('Stage 1', () => {
    const valid = [
        'multi_digit',
        'newlines',
        'no_newlines',
        'return_0',
        'return_2',
        'spaces',
    ];
    const invalid = [
        'missing_paren',
        'missing_retval',
        'no_brace',
        'no_semicolon',
        'no_space',
        'wrong_case',
    ];

    valid.forEach((name) => {
        it(`should generate valid assembly for '${name}.c'`, test(`${VALID}/${name}.c`));
    });

    invalid.forEach((name) => {
        it(`should throw an exception for '${name}'.c`, () => {
            const result = pipeline(`${INVALID}/${name}.c`);
            assert(result.error);
        });
    });
})

