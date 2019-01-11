// helper file for testing purposes

import { generate } from './Generator';
import { lex } from './Lexer';
import { parse } from './Parser';

import fs from 'fs';

export default function pipeline(filename: string, output?: string) {
    try {
        const content = fs.readFileSync(filename, { encoding: 'utf8' });
        const tokens = lex(content, filename);
        const ast = parse(tokens);
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
        return {
            error: (error as Error)
        }
    }
}

