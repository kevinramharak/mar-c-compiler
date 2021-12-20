import assert from 'assert';

import { EOFError, IndexOutOfBoundsError } from '../../src/Error';
import { StringStream } from '../../src/StringStream';

describe('StringStream', () => {
    it(`should throw an EOFError when trying to 'StringStream.peek()' beyond the remaining content length`, () => {
        const input = '012345';
        const stream = new StringStream(input);
        assert.throws(() => {
            stream.peek(input.length + 1);
        }, EOFError, `expected 'stream.peek(${input.length + 1}) to throw 'EOFError'`);
    });

    it(`should throw an EOFError when trying to 'StringStream.next()' beyond the remaining content length`, () => {
        const input = '012345';
        const stream = new StringStream(input);
        assert.throws(() => {
            stream.next(input.length + 1);
        }, EOFError, `expected 'stream.next(${input.length + 1}) to throw 'EOFError'`);
    });

    it(`should throw an IndexOutOfBoundsError when setting the cursor to a negative value`, () => {
        const input = '012345';
        const stream = new StringStream(input);
        assert.throws(() => {
            // NOTE: this is a private setter
            (stream as any).cursor = -1;
        }, IndexOutOfBoundsError, `expected 'stream.index = -1' to throw 'IndexOutOfBoundsError'`);
    });

    
    it(`should throw an IndexOutOfBoundsError when setting the cursor to a value greater than the content length`, () => {
        const input = '012345';
        const stream = new StringStream(input);
        assert.throws(() => {
            // NOTE: this is a private setter
            (stream as any).cursor = input.length + 1;
        }, IndexOutOfBoundsError, `expected 'stream.index = input.length' to throw 'IndexOutOfBoundsError'`);
    });
});