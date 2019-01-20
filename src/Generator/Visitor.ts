import { INode } from '../AST';
import { IVisitor } from '.';
export default class Visitor<T = string> implements IVisitor<T> {
    constructor() {
        
    }

    public visit(node: INode): T {
        return node.accept(this);
    }
}