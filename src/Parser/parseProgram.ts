import { Program } from '../AST';
import { TokenStream } from '../TokenStream';

import parseFunctionDeclaration from './parseFunctionDeclaration';

export default function parseProgram(
    stream: TokenStream
): Program {
    const func = parseFunctionDeclaration(stream)
    return new Program(func);
};