import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';
import { IVisitor } from '../Visitor';

import Node from './Node';
import Statement from './Statement';

export default class FunctionDeclaration extends Node {
    constructor(public type: string, public  name: string, public  statement: Statement, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }
    
    public accept(visitor: IVisitor) {
        this.statement.accept(visitor);
        visitor.visit(this);
    }

    public get [Symbol.toStringTag](): string {
        return 'FunctionDeclaration';
    }
}