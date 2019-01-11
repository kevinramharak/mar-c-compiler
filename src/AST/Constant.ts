import { IToken } from 'src/Token';
import { TokenStream } from 'src/TokenStream';
import Node from './Node';
import IConstant from './IConstant';

export default class Constant<T = any> extends Node implements IConstant<T> {
    constructor(public type: string, public readonly value: T, info: Partial<{token: IToken, stream: TokenStream}> = {}) {
        super(info);
    }
    
    public get [Symbol.toStringTag](): string {
        return 'Constant';
    }
}

