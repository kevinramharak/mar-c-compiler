import { IToken } from "../Token";
import { TokenStream } from "../TokenStream";
import { IVisitor } from '../Generator';

import INode from "./INode";

export default class Node implements INode {
    public  token?: IToken;
    public  stream?: TokenStream;
    
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

    public accept(visitor: IVisitor) {
        return visitor.visit(this);
    }
}
