import { INode } from '../AST';
import { IToken } from '../Token';
import { TokenStream } from '../TokenStream';

import parseProgram from './parseProgram';

export default function parse(stream: IToken[] | TokenStream): INode {
    stream = !(stream instanceof TokenStream) ? new TokenStream(stream) : stream;
    return parseProgram(stream);
}
