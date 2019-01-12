import { IToken } from 'src/Token';
import { TokenStream } from 'src/TokenStream';
import Expression from './Expression';
import IConstant from './IConstant';

export default class Constant<T = any> extends Expression implements IConstant<T> {
    constructor(public type: string, public readonly value: T, info: Partial<{token: IToken, stream: TokenStream}> = {}) {
        super(info);
    }
    
    public get [Symbol.toStringTag](): string {
        return 'Constant';
    }
}

