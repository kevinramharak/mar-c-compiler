import { INode } from "../AST";

export default interface IVisitor<T = any> {
    visit(node : INode): void;
    result?: T;
}
