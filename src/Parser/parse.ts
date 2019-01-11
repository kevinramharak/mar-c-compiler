import { Node } from '../AST';
import { IToken, Token, TokenType } from '../Token';
import { TokenStream } from '../TokenStream';

import parseProgram from './parseProgram';

export default function parse(stream: IToken[] | TokenStream): Node {
    stream = Array.isArray(stream) ? new TokenStream(stream) : stream;
    return parseProgram(stream);
}
