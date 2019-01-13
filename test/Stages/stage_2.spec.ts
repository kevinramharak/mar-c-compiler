import * as mocha from 'mocha';
import assert from 'assert';

import pipeline from '../../src/pipeline';

import { CodeGenVisitor } from '../../src/Generator';

const PREFIX = './samples/stage_2';
const INVALID = `${PREFIX}/invalid`;
const VALID = `${PREFIX}/valid`;

const visitor = new CodeGenVisitor();
const labelNot = visitor.generateLabel('logical_not');
const labelNotTrue = labelNot.annotate('true');
const labelNotEnd = labelNot.annotate('end');

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
  NOT A
  NEG A
  ret
`,      'nested_ops': `\
main:
  MOV A, 3
  NEG A
  TEST A, A
  JZ ${labelNotTrue}
  MOV A, 0
  JMP ${labelNotEnd}
${labelNotTrue}:
  MOV A, 1
${labelNotEnd}:
  ret
`,  'not_five': `\
main:
  MOV A, 5
  TEST A, A
  JZ ${labelNotTrue}
  MOV A, 0
  JMP ${labelNotEnd}
${labelNotTrue}:
  MOV A, 1
${labelNotEnd}:
  ret
`,  'not_zero': `\
main:
  MOV A, 0
  TEST A, A
  JZ ${labelNotTrue}
  MOV A, 0
  JMP ${labelNotEnd}
${labelNotTrue}:
  MOV A, 1
${labelNotEnd}:
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

