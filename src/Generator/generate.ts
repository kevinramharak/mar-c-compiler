import { INode } from '../AST';
import Visitor from './CodeGenVisitor';

export default function generate(ast: INode): string {
    const visitor = new Visitor();
    ast.accept(visitor);
    return visitor.result;
}
