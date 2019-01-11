import * as mocha from 'mocha';
import assert from 'assert';

import { StringStream, EOFError } from '../../src/StringStream';

describe('StringStream', () => {
    it('should throw the EOFError at #StringStream.peek', () => {
        const input = '012345';
        const stream = new StringStream(input);

        let test = false;
        try {
            stream.peek(input.length + 1);
        } catch (e) {
            if (e instanceof EOFError) {
                test = true;
            }
        }
        assert(test);
    });

    it('should throw the EOFError with #StringStream.next', () => {
        const input = '012345';
        const stream = new StringStream(input);

        let test = false;
        try {
            stream.next(input.length + 1);
        } catch (e) {
            if (e instanceof EOFError) {
                test = true;
            }
        }
        assert(test);
    });

    it('should emit the indexOverflow event', () => {
        const input = '012345';
        const stream = new StringStream(input);

        let test = false;
        stream.emitter.on('indexOverflow', () => {
            test = true;
        });

        stream.next(input.length + 1, true);

        assert(test);
    });

    it('should emit the EOFError event on #StringStream.peek', () => {
        const input = '012345';
        const stream = new StringStream(input);

        let test = false;
        stream.emitter.on('EOFError', (error: EOFError) => {
            if (error instanceof EOFError) {
                test = true;
            }
        });

        try {
            stream.peek(input.length + 1);
        } catch (e) { }

        assert(test);
    });

    it('should emit the EOFError event on #StringStream.next', () => {
        const input = '012345';
        const stream = new StringStream(input);

        let test = false;
        stream.emitter.on('EOFError', (error: EOFError) => {
            if (error instanceof EOFError) {
                test = true;
            }
        });

        try {
            stream.next(input.length + 1);
        } catch (e) { }

        assert(test);
    });
});