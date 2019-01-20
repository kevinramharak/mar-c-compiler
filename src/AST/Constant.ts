import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';

import Expression from './Expression';
import IConstant from './IConstant';

export default class Constant<T = any> extends Expression implements IConstant<T> {
    constructor(public type: string, public  value: T, info: Partial<{token: IToken, stream: TokenStream}> = {}) {
        super(info);
    }
    
    public get [Symbol.toStringTag](): string {
        return 'Constant';
    }
}

