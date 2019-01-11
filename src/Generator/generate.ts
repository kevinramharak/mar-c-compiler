import { Node } from '../AST';
import Visitor from './CodeGenVisitor';

export default function generate(ast: Node): string {
    return new Visitor().visit(ast) as string;
}
