import { IToken } from 'src/Token';
import { TokenStream } from 'src/TokenStream';

import FunctionDeclaration from './FunctionDeclaration';
import Node from './Node';

export default class Program extends Node {
    constructor(public readonly declaration: FunctionDeclaration, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
        this.children = [declaration];
    }

    public get [Symbol.toStringTag](): string {
        return 'Program';
    }
}