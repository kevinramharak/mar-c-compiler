import { BinaryOp, Expression, IntegerConstant, ReturnStatement } from '../AST';
import { TokenType } from '../Token';
import { Visitor } from '../Visitor';

export default class OptimizerVisitor extends Visitor {
    constructor() {
        super();
    }

    public visitReturnStatement(node: ReturnStatement) {
        if (node.expression instanceof BinaryOp) {
            node.expression = this.evaluateBinaryOp(node.expression as BinaryOp);
        }
    }

    public evaluateBinaryOp(node: BinaryOp): Expression {
        if ((node.left instanceof IntegerConstant) && (node.right instanceof IntegerConstant)) {
            switch (node.operator.type) {
                case TokenType.ADDITION: {
                    const value = (node.left as IntegerConstant).value + (node.right as IntegerConstant).value;
                    console.log(value);
                    return new IntegerConstant(value);
                }
            }
        }
        return node;
    }
}
