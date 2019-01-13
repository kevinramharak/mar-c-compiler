import * as AST from '../AST';
import Visitor from './Visitor';
import { TokenType } from '../Token';

export default class CodeGenVisitor extends Visitor<string> {
    private label = 0;

    constructor() {
        super()
    }

    private generateLabel(extra: string = ''): string {
        return `LABEL_${this.label++}_${extra}`;
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
                const trueLabel = this.generateLabel('not_equals_true');
                const endLabel = this.generateLabel('not_equals_end');
                asm += '  CMP A, B\n';
                asm += `  JNZ ${trueLabel}\n`;
                asm += '  MOV A, 0\n';
                asm += `  JMP ${endLabel}\n`;
                asm += `${trueLabel}:\n`;
                asm += '  MOV A, 1\n';
                asm += `${endLabel}:\n`;
            }
            case TokenType.EQUALITY: {
                const trueLabel = this.generateLabel('equals_true');
                const endLabel = this.generateLabel('equals_end');
                asm += '  CMP A, B\n';
                asm += `  JZ ${trueLabel}\n`;
                asm += '  MOV A, 0\n';
                asm += `  JMP ${endLabel}\n`;
                asm += `${trueLabel}:\n`;
                asm += '  MOV A, 1\n';
                asm += `${endLabel}:\n`;
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

    // TODO: fix this, currently generated code and tests are wrong
    public visitUnaryOp(node: AST.UnaryOp): string {
        let asm = this.visit(node.expression) as string;
        switch (node.operator.type) {
            case TokenType.LOGICAL_NOT:
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
