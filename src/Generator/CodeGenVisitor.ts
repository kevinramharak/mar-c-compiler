import { TokenType } from '../Token';
import { ILabel } from '.';
import * as AST from '../AST';

import Visitor from './Visitor';

export default class CodeGenVisitor extends Visitor<string> {
    private labelId = 0;
    private text = '';

    constructor() {
        super()
    }

    public get result(): string {
        return this.text;
    }

    public generateLabel(extra: string = ''): ILabel {
        const label = `LABEL_${this.labelId++}${(extra) ? `_${extra}` : ''}`;
        const annotate = (msg: string) => label + `_${msg}`;
        const toString = () => label;
        return {
            label,
            annotate,
            toString,
        }
    }

    public visitFunctionDeclaration(node: AST.FunctionDeclaration) {
        this.text += `\
${node.name}:
`;
    }

    // no ret but brk if function is main, or some custom exit function to wrap the brk instruction
    public visitReturnStatement(node: AST.ReturnStatement) {
        this.text += `\
  ret
`;
    }

    public visitBinaryOp(node: AST.BinaryOp) {
        let asm = `\
  POP A
  POP B
`;
        switch (node.operator.type) {
            case TokenType.MULTIPLICATION:
                asm += '  MUL B'
                asm += '\n';
                break;
            case TokenType.DIVISION:
                // see https://github.com/simon987/Much-Assembly-Required/wiki/Instruction-Set#div
                asm += '  MOV Y, 0\n';
                asm += '  DIV B\n';
                break;
            case TokenType.ADDITION:
                asm += '  ADD A, B\n';
                break;
            case TokenType.NEGATION:
                asm += '  SUB A, B\n';
                break;
            case TokenType.NOT_EQUALS: {
                const label = this.generateLabel('not_equals');
                const trueLabel = label.annotate('true');
                const endLabel = label.annotate('end');
                asm += `\
  CMP A, B
  JNZ ${trueLabel}
  MOV A, 0
  JMP ${endLabel}
${trueLabel}:
  MOV A, 1
${endLabel}:
`;
                break;
            }
            case TokenType.EQUALITY: {
                const label = this.generateLabel('not_equals');
                const trueLabel = label.annotate('true');
                const endLabel = label.annotate('end');
                asm += `\
  CMP A, B
  JZ ${trueLabel}
  MOV A, 0
  JMP ${endLabel}
${trueLabel}:
  MOV A, 1
${endLabel}:
`;
                break;
            }
            case TokenType.LESS_THAN: {
                const label = this.generateLabel('less_than');
                const trueLabel = label.annotate('true');
                const endLabel = label.annotate('end');
                asm += `\
  CMP A, B
  JL ${trueLabel}
  MOV A, 0
  JMP ${endLabel}
${trueLabel}:
  MOV A, 1
${endLabel}:
`;
            }
            case TokenType.LESS_OR_EQUALS: {
                const label = this.generateLabel('less_or_equals');
                const trueLabel = label.annotate('true');
                const endLabel = label.annotate('end');
                asm += `\
  CMP A, B
  JLE ${trueLabel}
  MOV A, 0
  JMP ${endLabel}
${trueLabel}:
  MOV A, 1
${endLabel}:
`;
            }
            case TokenType.GREATER_THAN: {
                const label = this.generateLabel('greater_than');
                const trueLabel = label.annotate('true');
                const endLabel = label.annotate('end');
                asm += `\
  CMP A, B
  JG ${trueLabel}
  MOV A, 0
  JMP ${endLabel}
${trueLabel}:
  MOV A, 1
${endLabel}:
`;
            }
            case TokenType.GREATER_OR_EQUALS: {
                const label = this.generateLabel('greater_or_equals');
                const trueLabel = label.annotate('true');
                const endLabel = label.annotate('end');
                asm += `\
  CMP A, B
  JGE ${trueLabel}
  MOV A, 0
  JMP ${endLabel}
${trueLabel}:
  MOV A, 1
${endLabel}:
`;
            }
            case TokenType.LOGICAL_OR: {
                const label = this.generateLabel('logical_or');
                const trueLabel = label.annotate('true');
                const endLabel = label.annotate('end');
                asm += `\
  OR A, B
  JNZ ${trueLabel}
  MOV A, 0
  JMP ${endLabel}
${trueLabel}:
  MOV A, 1
${endLabel}:
`;
            }
            case TokenType.LOGICAL_AND: {
                const label = this.generateLabel('logical_and');
                const trueLabel = label.annotate('true');
                const endLabel = label.annotate('end');
                asm += `
  CMP A, 0
  JNZ ${trueLabel}
  CMP B, 0
  JNZ ${trueLabel}
  MOV A, 0
  JMP ${endLabel}
${trueLabel}:
  MOV A, 1
${endLabel}:
`;
                break;
            }
        }
        asm += '  PUSH A\n'
        this.text += asm;
    }

    public visitUnaryOp(node: AST.UnaryOp) {
        let asm = `\
  POP A
`
        switch (node.operator.type) {
            case TokenType.LOGICAL_NOT: {
                const label = this.generateLabel('logical_not');
                const trueLabel = label.annotate('true');
                const endLabel = label.annotate('end');
                asm += `\
  TEST A, A
  JZ ${trueLabel}
  MOV A, 0
  JMP ${endLabel}
${trueLabel}:
  MOV A, 1
${endLabel}:
  PUSH A
`;
                break;
            }
            case TokenType.BITWISE_NOT:
                asm += `\
  NOT A
`;
            break;
            case TokenType.NEGATION:
                asm += `\
  NEG A
`;
                break;
        }
        asm += ' PUSH A\n';
        this.text += asm;
    }

    public visitIntegerConstant(node: AST.IntegerConstant) {
        this.text += `\
  PUSH ${node.value}
`;
    }
}
