import { INode } from '../AST';
import Visitor from './OptimizerVisitor';

export default function optimize(ast: INode): INode {
    const visitor = new Visitor();
    ast.accept(visitor);
    return ast;
}
