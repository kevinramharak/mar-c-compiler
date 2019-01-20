import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';

import Expression from './Expression';
import Statement from './Statement';

export default class ReturnStatement extends Statement {
    constructor(public readonly expression: Expression, info: Partial<{ token: IToken, stream: TokenStream }> = {}) {
        super(info);
    }

    public get [Symbol.toStringTag](): string {
        return 'ReturnStatement';
    }
}
