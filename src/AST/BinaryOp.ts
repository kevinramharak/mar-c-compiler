import { IToken } from 'src/Token';
import { TokenStream } from 'src/TokenStream';
import Expression from './Expression';

export default class BinaryOp extends Expression {
    constructor(public readonly operator: string, public readonly left: Expression, public readonly right: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
        this.children = [left, right];
    }

    public get [Symbol.toStringTag](): string {
        return 'BinaryOp';
    }
}