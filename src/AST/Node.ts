import { IToken } from "../Token";
import { TokenStream } from "../TokenStream";
import { IVisitor } from '../Visitor';

import INode from "./INode";
import { inspect } from "util";

export default class Node implements INode {
    public token?: IToken;
    public stream?: TokenStream;
    
    constructor(info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        this.token = info.token;
        this.stream = info.stream;
    }
    
    public get [Symbol.toStringTag](): string {
        return 'Node';
    }

    public get nodeType(): string {
        return Object.prototype.toString.call(this).slice(8, -1);
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

    public [inspect.custom]() {
        return this.toJSON();
    }

    public toJSON() {
        const entries = Object.entries(this).filter(([name, value]) => name !== 'stream' && typeof value !== 'function');
        const map = entries.reduce((map, [name, value]) => { map[name] = value; return map; }, {} as any);
        map.nodeType = this.nodeType;
        return map;
    }
}
