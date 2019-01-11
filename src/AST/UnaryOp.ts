import { IToken } from 'src/Token';
import { TokenStream } from 'src/TokenStream';
import Expression from './Expression';

export default class UnaryOp extends Expression {
    constructor(public readonly operator: string, public readonly expression: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
        this.children = [expression];
    }

    public get [Symbol.toStringTag](): string {
        return 'UnaryOp';
    }
}