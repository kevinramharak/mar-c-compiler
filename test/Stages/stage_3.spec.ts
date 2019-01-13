import * as mocha from 'mocha';
import assert from 'assert';

import pipeline from '../../src/pipeline';

const PREFIX = './samples/stage_3';
const INVALID = `${PREFIX}/invalid`;
const VALID = `${PREFIX}/valid`;

describe('Stage 3', () => {
    const valid: any = {
        'add': `\
main:
  MOV A, 2
  PUSH A
  MOV A, 1
  POP B
  ADD A, B
  ret
`,      'associativity_2': `\
main:
  MOV A, 2
  PUSH A
  MOV A, 3
  PUSH A
  MOV A, 6
  POP B
  MOV Y, 0
  DIV B
  POP B
  MOV Y, 0
  DIV B
  ret
`,      'associativity': `\
main:
  MOV A, 3
  PUSH A
  MOV A, 2
  PUSH A
  MOV A, 1
  POP B
  SUB A, B
  POP B
  SUB A, B
  ret
`,      'div': `\
main:
  MOV A, 2
  PUSH A
  MOV A, 4
  POP B
  MOV Y, 0
  DIV B
  ret
`,      'mult': `\
main:
  MOV A, 3
  PUSH A
  MOV A, 2
  POP B
  MUL B
  ret
`,      'parens': `\
main:
  MOV A, 4
  PUSH A
  MOV A, 3
  POP B
  ADD A, B
  PUSH A
  MOV A, 2
  POP B
  MUL B
  ret
`,      'precedence': `\
main:
  MOV A, 4
  PUSH A
  MOV A, 3
  POP B
  MUL B
  PUSH A
  MOV A, 2
  POP B
  ADD A, B
  ret
`,      'sub_neg': `\
main:
  MOV A, 1
  NEG A
  PUSH A
  MOV A, 2
  POP B
  SUB A, B
  ret
`,      'sub': `\
main:
  MOV A, 2
  PUSH A
  MOV A, 1
  POP B
  SUB A, B
  ret
`,      'unop_add': `\
main:
  MOV A, 3
  PUSH A
  MOV A, 2
  NOT A
  POP B
  ADD A, B
  ret
`,      'unop_parens': `\
main:
  MOV A, 1
  PUSH A
  MOV A, 1
  POP B
  ADD A, B
  NOT A
  ret
`
};

    const invalid: string[]= [
        'malformed_paren',
        'missing_first_op',
        'missing_second_op',
        'no_semicolon',
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