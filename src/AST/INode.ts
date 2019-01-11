import { IToken } from "src/Token";
import { TokenStream } from "src/TokenStream";

export default interface INode {
    children: INode[];
    token?: IToken;
    stream?: TokenStream;
    friendlyError(message: string): string;
    [Symbol.toStringTag]: string;
}
