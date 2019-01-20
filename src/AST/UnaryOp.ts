import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';
import { IVisitor } from '../Generator';

import Expression from './Expression';

export default class UnaryOp extends Expression {
    constructor(public readonly operator: IToken, public readonly expression: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    public accept(visitor: IVisitor) {
        this.expression.accept(visitor);
        visitor.visit(this);
    }

    public get [Symbol.toStringTag](): string {
        return 'UnaryOp';
    }
}