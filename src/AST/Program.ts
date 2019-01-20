import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';

import FunctionDeclaration from './FunctionDeclaration';
import Node from './Node';

export default class Program extends Node {
    constructor(public readonly declaration: FunctionDeclaration, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    public get [Symbol.toStringTag](): string {
        return 'Program';
    }
}