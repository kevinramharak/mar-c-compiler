
import splitTokenTypes from './splitTokenTypes';

import { IToken, Token, TokenType } from '../Token';
import ParseError from './ParseError';

export default class TokenStream {
    private _index = 0;
    private EOFToken: IToken;

    private get index() {
        return this._index;
    }

    private set index(value: number) {
        this._index = value;
        if (this._index > this.tokens.length) {
            this._index = this.tokens.length;
        }
    }

    constructor(private tokens: IToken[]) {
        // sniff filename if possible
        const filename = tokens[0] && tokens[0].file;
        // create a fake token to signal EOF but with a valid Token instance
        this.EOFToken = new Token(TokenType.EOF, '[eof]', {
            name: filename || '[eof]',
            line: 0,
            col: 0
        });
    }

    public get eof(): boolean {
        return this.index === this.tokens.length;
    }

    public peek(offset = 0): IToken {
        return this.tokens[this.index + offset] || this.EOFToken;
    }

    public next(): IToken {
        return this.tokens[this.index++] || this.EOFToken;
    }

    public expect(type: TokenType, message?: string): IToken {
        const token = this.peek();
        if (token.type & type) {
            return this.next();
        }
        return this.panic(token, (message) ? message : type);
    }

    /**
     * @throws {Error}
     */
    public panic(token: IToken, type: string|TokenType): never {
        const msg = (typeof type === 'string') ? type : splitTokenTypes(type);
        throw new ParseError(`ParseError in '${token.file}' at ${token.line}:${token.col}`, this.friendlyError(token, `expected '${msg}' instead got '${TokenType[token.type]}' `), token, this);
    }

    /**
     * Generate a user friendly error message based on the current state and given token
     * #NOTE: this .filter() could be optimised with just using a normal for loop
     * @param token 
     */
    public friendlyError(token: IToken, message: string): string {
        if (this.tokens.indexOf(token) === -1) {
            return 'given token does not exist in stream';
        }
        // gather all tokens up to 2 lines before the passed token
        const lines = [token.line - 2, token.line - 1, token.line].filter(line => line > 0);
        const output = lines.map((line) => {
            return `${line}| ` + this.tokens.filter((token) => token.line === line).reduce((str, token) => {
                const indent = (token.col - 1) - str.length;
                return str + ' '.repeat((indent >= 0) ? indent : 0) + token.lexeme;
            }, '');
        })
        
        // insert big arrow to faulty token
        const prefix = ' '.repeat(token.line.toString().length) + '  ';
        const extra = ' '.repeat(token.col - 1) + '^'.repeat(token.lexeme.length);
        output.push(prefix + extra + '\n' + message);
        
        return output.join('\n');
    }
}
