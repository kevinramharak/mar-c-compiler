// helper file for testing purposes

import { CompilerError } from './Error';
import { generate } from './Generator';
import { lex } from './Lexer';
import { parse } from './Parser';
import { optimizer } from './Optimizer';

import fs from 'fs';

export default function pipeline(filename: string, output?: string) {
    try {
        const content = fs.readFileSync(filename, { encoding: 'utf8' });
        const tokens = lex(content, filename);
        const ast = parse(tokens);
        const optimizedAst = optimizer(ast);
        const asm = generate(optimizedAst);

        if (output) {
            fs.writeFileSync(output, asm, { encoding: 'utf8' });
        }

        return {
            content,
            tokens,
            ast,
            optimizedAst,
            asm,
        }
    } catch (error) {
        if (error instanceof CompilerError) {
            return {
                error: (error as Error)
            }
        } else {
            throw error;
        }
    }
}

