import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';

import Expression from './Expression';

export default class UnaryOp extends Expression {
    constructor(public readonly operator: IToken, public readonly expression: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    public get [Symbol.toStringTag](): string {
        return 'UnaryOp';
    }
}