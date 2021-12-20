import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';

import Statement from './Statement';

export default class Expression extends Statement {
    constructor(info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }
    
    public get [Symbol.toStringTag](): string {
        return 'Expression';
    }
}

