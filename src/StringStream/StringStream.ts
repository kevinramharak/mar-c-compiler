import { EventEmitter } from 'events';
import EOFError from './EOFError';

export default class StringStream {
    private get index(): number {
        return this._index;
    }

    /**
     * Prevents index from being larger than input length
     *
     * @private
     * @memberof StringStream
     */
    private set index(value: number) {
        this._index = value;
        if (this._index > this.input.length) {
            this.emitter.emit('indexOverflow');
            this._index = this.input.length;
        }
    }

    /**
     * Represents end of stream flag
     */
    public get eof(): boolean {
        return this.index === this.input.length;
    }
    
    public readonly emitter = new EventEmitter();

    private _index = 0;

    /**
     * 
     * @param input Input string to provide stream like interface for
     */
    constructor(public readonly input: string) {
        
    }

    /**
     * Peek `length` amount of characters and return them as a string
     * @throws {EOFError}
     * @param length
     * @param [noThrow] suppress EOFError
     */
    public peek(length: number = 1, noThrow: boolean = false): string {
        if (!noThrow) {
            this.checkEOFError(length);
        }
        const substr = this.input.substr(this.index, length);
        this.emitter.emit('peek', substr);
        return substr;
    }

    /**
     * Consume `length` amount of characters and return them as a string
     * @param length
     * @param noThrow suppress EOFError
     */
    public next(length: number = 1, noThrow: boolean = false): string {
        if (!noThrow) {
            this.checkEOFError(length);
        }
        const substr = this.input.substr(this.index, length);
        this.index += length;
        this.emitter.emit('next', substr);
        return substr;
    }

    /**
     * Consume characters as long as the condition callback returns true
     * @param condition callback function to determince if more characters should be consumed
     */
    public while(condition: (c: string, index?: number) => boolean): string {
        let index = 0;
        let substr = '';
        while(!this.eof) {
            if (condition(this.peek(), index++)) {
                substr += this.next();
            } else {
                break;
            }
        }
        return substr;
    }

    /**
     * @throws {EOFError}
     * @param length 
     */
    private checkEOFError(length: number) {
        if (this.index + length > this.input.length) {
            const error = new EOFError(`#StringStream.next(${length}) - exceeded end of file`);
            this.emitter.emit('EOFError', error);
            throw error;
        }
    }
}
