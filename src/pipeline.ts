// helper file for testing purposes

import { IOptions } from './Options';
import { CompilerError } from './Error';
import { generate } from './Generator';
import { lex } from './Lexer';
import { parse } from './Parser';
import { optimize } from './Optimizer';

import fs from 'fs';

export default function pipeline(filename: string, options: IOptions, output?: string) {
    try {
        const content = fs.readFileSync(filename, { encoding: 'utf8' });
        const tokens = lex(content, filename);
        let ast = parse(tokens);

        if (options.optimize) {
            ast = optimize(ast);
        }

        const asm = generate(ast);

        if (output) {
            fs.writeFileSync(output, asm, { encoding: 'utf8' });
        }

        return {
            content,
            tokens,
            ast,
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

