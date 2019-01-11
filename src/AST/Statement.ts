import { IToken } from 'src/Token';
import { TokenStream } from 'src/TokenStream';
import Node from './Node';

export default class Statement extends Node {
    constructor(info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }
    
    public get [Symbol.toStringTag](): string {
        return 'Statement';
    }
}