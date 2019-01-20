import { IToken } from "../Token";
import { TokenStream } from "../TokenStream";
import { IVisitor } from "../Generator";

export default interface INode {
    token?: IToken;
    stream?: TokenStream;
    accept(visitor: IVisitor): void; 
    friendlyError(message: string): string;
    [Symbol.toStringTag]: string;
}
