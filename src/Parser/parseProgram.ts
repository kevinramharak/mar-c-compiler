import { Program } from '../AST';
import { TokenStream } from '../TokenStream';

import parseFunctionDeclaration from './parseFunctionDeclaration';

export default function parseProgram(
    stream: TokenStream
): Program {
    const functions = [];
    while (!stream.eof) {
        functions.push(
            parseFunctionDeclaration(stream),
        );
    }
    return new Program(functions, { token: functions[0].token || stream.EOFToken, stream });
};
