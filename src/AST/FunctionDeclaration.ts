import { IToken } from 'src/Token';
import { TokenStream } from 'src/TokenStream';
import Node from './Node';
import Statement from './Statement';

export default class FunctionDeclaration extends Node {
    constructor(public readonly type: string, public readonly name: string, public readonly statement: Statement, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
        this.children = [statement];
    }
    
    public get [Symbol.toStringTag](): string {
        return 'FunctionDeclaration';
    }
}