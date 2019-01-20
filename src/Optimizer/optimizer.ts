import { INode } from '../AST';
import Visitor from './OptimizerVisitor';

export default function generate(ast: INode): INode {
    const visitor = new Visitor();
    ast.accept(visitor);
    return ast;
}
