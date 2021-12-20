import { EOFError, IndexOutOfBoundsError }  from '../Error';

export default class StringStream {
    private get cursor(): number {
        return this._cursor;
    }

    /**
     * Prevents index from being larger than input length
     *
     * @private
     * @memberof StringStream
     */
    private set cursor(value: number) {
        if (value < 0 || value > this.input.length) {
            throw new IndexOutOfBoundsError();
        }
        this._cursor = value;
    }

    /**
     * Represents end of stream flag
     */
    public get eof(): boolean {
        return this.cursor === this.input.length;
    }
    
    /**
     * internal cursor
     */
    private _cursor = 0;

    /**
     * 
     * @param input Input string to wrap the stream
     */
    constructor(public readonly input: string) {}

    /**
     * Peek `length` amount of characters and return them as a string
     * @throws {EOFError}
     * @param length
     * @param noThrow suppress EOFError
     */
    public peek(length: number = 1, noThrow: boolean = false): string {
        if (!noThrow) {
            this.checkEOFError(length);
        }
        const substr = this.input.substr(this.cursor, length);
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
        const substr = this.input.substr(this.cursor, length);
        this.cursor += length;
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
        if (this.cursor + length > this.input.length) {
            const error = new EOFError(`#StringStream.next(${length}) - exceeded end of file`);
            throw error;
        }
    }
}
