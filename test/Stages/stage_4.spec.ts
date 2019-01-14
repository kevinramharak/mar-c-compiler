import * as mocha from 'mocha';
import assert from 'assert';

import pipeline from '../../src/pipeline';

const PREFIX = './samples/stage_4';
const INVALID = `${PREFIX}/invalid`;
const VALID = `${PREFIX}/valid`;

describe('Stage 4', () => {
    const valid: any = {
};

    const invalid: string[]= [
        'missing_first_op',
        'missing_mid_op',
        'missing_second_op',
        'missing_semicolon',
    ];

    Object.keys(valid).forEach((name) => {
        it(`should generate valid assembly for '${name}.c'`, () => {
            const result = pipeline(`${VALID}/${name}.c`);

            assert(!result.error, result.error);
            assert(result.asm! === valid[name], `\n${result.asm!} ===\n${valid[name]}`);
        });
    });

    invalid.forEach((name) => {
        it(`should throw an exception for '${name}'.c`, () => {
            const result = pipeline(`${INVALID}/${name}.c`);
            assert(result.error);
        });
    });
})