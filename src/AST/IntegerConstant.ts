import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';

import Constant from './Constant';

export default class IntegerConstant<T extends number = number> extends Constant<T> {
    constructor(value: T, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super('int16_t', value, info);
    }
    
    public get [Symbol.toStringTag](): string {
        return 'IntegerConstant';
    }
}
