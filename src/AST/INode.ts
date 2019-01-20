import { IToken } from "../Token";
import { TokenStream } from "../TokenStream";
import { IVisitor } from "../Visitor";

export default interface INode {
    token?: IToken;
    stream?: TokenStream;
    nodeType: string;
    accept(visitor: IVisitor): void; 
    friendlyError(message: string): string;
    [Symbol.toStringTag]: string;
}
