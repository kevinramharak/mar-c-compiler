import { INode } from '../AST';
import { IVisitor } from '.';

export default class Visitor<T = string> implements IVisitor<T> {
    constructor() {
        
    }

    public visit(node: INode): void {
        const type = Object.prototype.toString.call(node).slice(8, -1);
        const visitor = (this as any)['visit' + type] as ((node: INode, ...args: any[]) => void) | undefined;
        if (typeof visitor !== 'undefined') {
            visitor.call(this, node);
        }
    }
}