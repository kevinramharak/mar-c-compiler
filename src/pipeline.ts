// helper file for testing purposes

import { IOptions } from './Options';
import { CompilerError } from './Error';
import { generate } from './Generator';
import { lex } from './Lexer';
import { parse } from './Parser';
import { optimize } from './Optimizer';

import fs from 'fs';
import { INode } from './AST';
import { IToken } from './Token';

export interface IPipelineOutput {
    content: string;
    tokens: IToken[];
    ast: INode;
    asm: string;
    error?: CompilerError;
}

export default function pipeline(filename: string, options: IOptions = { optimize: false }, output?: string): Partial<IPipelineOutput> {
    try {
        const content = fs.readFileSync(filename, { encoding: 'utf8' });
        const tokens = lex(content, filename);
        let ast = parse(tokens);

        fs.writeFileSync('dump.json', JSON.stringify(ast, null, 2), { encoding: 'utf8' });

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
                error
            };
        } else {
            throw error;
        }
    }
}

