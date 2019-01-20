import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';

import Expression from './Expression';

export default class BinaryOp extends Expression {
    constructor(public readonly operator: IToken, public readonly left: Expression, public readonly right: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    public get [Symbol.toStringTag](): string {
        return 'BinaryOp';
    }
}