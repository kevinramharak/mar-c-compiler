import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';
import { IVisitor } from '../Visitor';

import Node from './Node';
import Statement from './Statement';
import ReturnStatement from './ReturnStatement'
import IntegerConstant from './IntegerConstant';

export default class FunctionDeclaration extends Node {
    constructor(public type: string, public name: string, public statements: Statement[], info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);

        // implicitly return 0 if the last statement is not a return statement
        const last = this.statements[this.statements.length - 1];
        if (!(last instanceof ReturnStatement)) {
            const value = new IntegerConstant(0);
            const statement = new ReturnStatement(value);
            this.statements.push(statement);
        }
    }
    
    public accept(visitor: IVisitor) {
        visitor.visit(this);
        this.statements.forEach(statement => statement.accept(visitor));
    }

    public get [Symbol.toStringTag](): string {
        return 'FunctionDeclaration';
    }
}