import { IToken } from 'src/Token';
import { TokenStream } from 'src/TokenStream';
import Expression from './Expression';
import Statement from './Statement';

export default class ReturnStatement extends Statement {
    constructor(public readonly expression: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
        this.children = [expression];
    }

    public get [Symbol.toStringTag](): string {
        return 'ReturnStatement';
    }
}