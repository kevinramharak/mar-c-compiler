import { Node } from '../AST';

export default class Visitor<R = string> {
    constructor() {
        
    }

    public visit<T = R>(node: Node, ...args: any[]): T | T[] {
        const type = Object.prototype.toString.call(node).slice(8, -1);
        const visitor = (this as any)['visit' + type] as ((node: Node, ...args: any[]) => T) | undefined;
        if (typeof visitor !== 'undefined') {
            return visitor.call(this, node, ...args);
        } else {
            return node.children.map(this.visit.bind(this)) as T[];
        }
    }
}