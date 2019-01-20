import { IToken } from "../Token";
import { TokenStream } from "../TokenStream";
import { IVisitor } from '../Generator';

import INode from "./INode";

export default class Node implements INode {
    public readonly token?: IToken;
    public readonly stream?: TokenStream;
    
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

    public accept<T>(visitor: IVisitor<T>): T {
        return visitor.visit(this);
    }
}
