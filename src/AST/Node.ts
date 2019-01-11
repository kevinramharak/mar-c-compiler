import { IToken } from "src/Token";
import { TokenStream } from "src/TokenStream";
import INode from "./INode";

export default class Node implements INode {
    public readonly token?: IToken;
    public readonly stream?: TokenStream;
    public children: INode[] = [];
    
    constructor(info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        this.token = info.token;
        this.stream = info.stream;
    }
    
    public get [Symbol.toStringTag](): string {
        return 'Node';
    }

    public friendlyError(message: string): string {
        if (!this.stream || !this.token) {
            return message;
        }
        return this.stream.friendlyError(this.token, message);
    }
}
