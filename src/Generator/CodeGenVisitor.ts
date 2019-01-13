import * as AST from '../AST';
import Visitor from './Visitor';
import { TokenType } from '../Token';
import { ILabel } from '.';

export default class CodeGenVisitor extends Visitor<string> {
    private labelId = 0;

    constructor() {
        super()
    }

    private generateLabel(extra: string = ''): ILabel {
        const label = `LABEL_${this.labelId++}${(extra) ? `_${extra}` : ''}`;
        const annotate = (msg: string) => label + `_${msg}`;
        const toString = () => label;
        return {
            label,
            annotate,
            toString,
        }
    }

    public visitProgram(node: AST.Program): string {
        return this.visit(node.declaration) as string;
    }

    public visitFunctionDeclaration(node: AST.FunctionDeclaration): string {
        return `\
${node.name}:
` + this.visit(node.statement);
    }

    // no ret but brk if function is main, or some custom exit function to wrap the brk instruction
    public visitReturnStatement(node: AST.ReturnStatement): string {
        return this.visit(node.expression) + `\
  ret
`;
    }

    public visitBinaryOp(node: AST.BinaryOp): string {
        let asm = this.visit(node.right);
        asm += '  PUSH A\n';
        asm += this.visit(node.left) as string;
        asm += '  POP B\n';
        switch (node.operator.type) {
            case TokenType.MULTIPLICATION:
                asm += '  MUL B'
                break;
            case TokenType.DIVISION:
                // see https://github.com/simon987/Much-Assembly-Required/wiki/Instruction-Set#div
                asm += '  MOV Y, 0\n';
                asm += '  DIV B';
                break;
            case TokenType.ADDITION:
                asm += '  ADD A, B';
                break;
            case TokenType.NEGATION:
                asm += '  SUB A, B';
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

            }
            case TokenType.LESS_OR_EQUALS: {

            }
            case TokenType.GREATER_THAN: {

            }
            case TokenType.GREATER_OR_EQUALS: {
                
            }
        }
        asm += '\n';
        return asm as string;
    }

    public visitUnaryOp(node: AST.UnaryOp): string {
        let asm = this.visit(node.expression) as string;
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
`
                break;
            }
            case TokenType.BITWISE_NOT:
                asm += `\
  NOT A
`
            case TokenType.NEGATION:
                asm += `\
  NEG A
`;
                break;
        }
        return asm;
    }

    public visitConstant(node: AST.Constant): string {
        return this.visitIntegerConstant(node);
    }

    public visitIntegerConstant(node: AST.IntegerConstant): string {
        return `\
  MOV A, ${node.value}
`
    }
}
