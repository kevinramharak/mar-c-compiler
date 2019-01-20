import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';
import { IVisitor } from '../Generator';

import Expression from './Expression';
import Statement from './Statement';

export default class ReturnStatement extends Statement {
    constructor(public readonly expression: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    public accept(visitor: IVisitor) {
        this.expression.accept(visitor);
        visitor.visit(this);
    }

    public get [Symbol.toStringTag](): string {
        return 'ReturnStatement';
    }
}
