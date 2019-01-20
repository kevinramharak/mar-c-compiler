import Expression from "./Expression";

import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';
import { IVisitor } from '../Visitor';

export default class VariableReference extends Expression {
    constructor(public name: string, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    
    public accept(visitor: IVisitor) {
        visitor.visit(this);
    }

    public get [Symbol.toStringTag](): string {
        return 'VariableReference';
    }
}
