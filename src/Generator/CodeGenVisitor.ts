import * as AST from '../AST';
import Visitor from './Visitor';

export default class CodeGenVisitor extends Visitor<string> {
    constructor() {
        super()
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
        let asm = this.visit(node.left);
        asm += '  PUSH A\n';
        asm += this.visit(node.right) as string;
        asm += '  POP B\n';
        switch (node.operator) {
            case '*':
                asm += '  MUL B'
            break;
            case '/':
                // see https://github.com/simon987/Much-Assembly-Required/wiki/Instruction-Set#div
                asm += '  MOV Y, 0';
                asm += '  DIV B';
            break;
            case '+':
                asm += '  ADD A, B';
                break;
            case '-':
                asm += '  SUB A, B';
                break;
        }
        asm += '\n';
        return asm as string;
    }

    public visitUnaryOp(node: AST.UnaryOp): string {
        return this.visit(node.expression) + `\
  NEG A
`
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
