import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';
import { IVisitor } from '../Generator';

import Expression from './Expression';

export default class BinaryOp extends Expression {
    constructor(public readonly operator: IToken, public readonly left: Expression, public readonly right: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    public accept(visitor: IVisitor) {
        this.right.accept(visitor);
        this.left.accept(visitor);
        visitor.visit(this);
    }

    public get [Symbol.toStringTag](): string {
        return 'BinaryOp';
    }
}