import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';
import { IVisitor } from '../Visitor';

import FunctionDeclaration from './FunctionDeclaration';
import Node from './Node';

export default class Program extends Node {
    constructor(public declarations: FunctionDeclaration[], info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    public accept(visitor: IVisitor) {
        this.declarations.forEach(declaration => declaration.accept(visitor));
        visitor.visit(this);
    }

    public get [Symbol.toStringTag](): string {
        return 'Program';
    }
}