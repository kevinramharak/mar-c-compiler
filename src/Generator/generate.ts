import { Node } from '../AST';
import Visitor from './CodeGenVisitor';

export default function generate(ast: Node): string {
    const visitor = new Visitor();
    ast.accept(visitor);
    return visitor.result;
}
