import Statement from './Statement';
import Expression from "./Expression";

import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';
import { IVisitor } from '../Visitor';

export default class Declaration extends Statement {
    constructor(public name: string, public expression?: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    public accept(visitor: IVisitor) {
        if (this.expression) {
            this.expression.accept(visitor);
        }
        visitor.visit(this);
    }

    public get [Symbol.toStringTag](): string {
        return 'Declaration';
    }
}
