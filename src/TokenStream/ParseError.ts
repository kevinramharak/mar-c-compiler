import { CompilerError } from '../Error';
import { IToken } from "../Token";

import TokenStream from "./TokenStream";

export default class ParseError extends CompilerError {
    constructor(message: string, public details: string, public token: IToken, public stream: TokenStream) {
        super(message);
    }

    public toString(): string {
        return this.message + '\n' + this.details;
    }
}
