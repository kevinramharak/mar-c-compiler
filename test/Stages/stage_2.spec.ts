import * as mocha from 'mocha';
import assert from 'assert';

import pipeline from '../../src/pipeline';

const PREFIX = './samples/stage_2';
const INVALID = `${PREFIX}/invalid`;
const VALID = `${PREFIX}/valid`;

// TODO: fix tests

describe('Stage 2', () => {
    const valid: any = {
        'bitwise_zero': `\
main:
  MOV A, 0
  NOT A
  ret
`,      'bitwise': `\
main:
  MOV A, 12
  NOT A
  ret
`,      'neg': `\
main:
  MOV A, 5
  NEG A
  ret
`,      'nested_ops_2': `\
main:
  MOV A, 0
  NEG A
  NOT A
  ret
`,      'nested_ops': `\
main:
  MOV A, 3
  NEG A
  NEG A
  ret
`,  'not_five': `\
main:
  MOV A, 5
  NEG A
  ret
`,  'not_zero': `\
main:
  MOV A, 0
  NEG A
  ret
`
    };

    const invalid = [
        'missing_const',
        'missing_semicolon',
        'nested_missing_const',
        'wrong_order',
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

