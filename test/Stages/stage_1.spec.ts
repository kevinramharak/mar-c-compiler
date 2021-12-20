import * as mocha from 'mocha';
import assert from 'assert';
import fs from 'fs';

import pipeline from '../../src/pipeline';
import { CompilerError } from '../../src/Error';

describe('Stage 1', () => {
    const VALID_PATH = 'samples/stage_1/valid';
    const INVALID_PATH = 'samples/stage_1/invalid';
    const valid = fs.readdirSync(VALID_PATH);
    const invalid = fs.readdirSync(INVALID_PATH);

    valid.forEach(name => {
        const filepath = `${VALID_PATH}/${name}`;
        it(`should generate valid assembly for '${name}'`, () => {
            const result = pipeline(filepath);
            const expected = fs.readFileSync(filepath.replace('.c', '.mar'), 'utf8')
            assert(!result.error, 'expected no compilation errors');
            assert.equal(result.asm, expected, `expected compilation of '${name}' to equal to contents of '${name.replace('.c', '.mar')}'`);
        });
    });

    invalid.forEach(name => {
        const filepath = `${INVALID_PATH}/${name}`;
        it(`should return a compilation error for '${name}'`, () => {
            const result = pipeline(filepath);
            assert(result.error instanceof CompilerError, `expected compilation of '${name}' to return a compiler error`);
        });
    })
});
