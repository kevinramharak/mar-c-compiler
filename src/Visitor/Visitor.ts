import { INode } from '../AST';

import IVisitor from './IVisitor';

export default class Visitor<T = string> implements IVisitor<T> {
    constructor() {
        
    }

    public visit(node: INode): void {
        const visitor = (this as any)['visit' + node.nodeType] as ((node: INode, ...args: any[]) => void) | undefined;
        if (typeof visitor !== 'undefined') {
            visitor.call(this, node);
        }
    }
}