import { BinaryOp, Expression, IntegerConstant, INode, Node, UnaryOp } from '../AST';
import { TokenType } from '../Token';
import { Visitor } from '../Visitor';

export default class OptimizerVisitor extends Visitor<INode> {
    private ast: INode = new Node;

    public get result(): INode {
        return this.ast;
    }

    constructor() {
        super();
    }

    public visit(node: INode) {
        for (const prop in node) {
            const ref = (node as any)[prop];
            console.log(prop, ref);
            if (!(ref instanceof Node)) {
                continue;
            }
            
            if (ref instanceof BinaryOp) {
                (node as any)[prop] = this.evaluateBinaryOp(ref);
            } else if (ref instanceof UnaryOp) {
                (node as any)[prop] = this.evaluateUnaryOp(ref);
            }
        }
        super.visit(node);
    }

    public evaluateUnaryOp(node: UnaryOp): Expression {
        if ((node.expression instanceof IntegerConstant)) {
            switch(node.operator.type) {
                case TokenType.NEGATION: {
                    const value = -((node.expression as IntegerConstant).value);
                    return new IntegerConstant(value);
                }
                case TokenType.BITWISE_NOT: {
                    const value = ~((node.expression as IntegerConstant).value);
                    return new IntegerConstant(value);
                }
                case TokenType.LOGICAL_NOT: {
                    const value = ((node.expression as IntegerConstant).value) ? 1 : 0;
                    return new IntegerConstant(value);
                }
            }
        }
        return node;
    }

    public evaluateBinaryOp(node: BinaryOp): Expression {
        if ((node.left instanceof IntegerConstant) && (node.right instanceof IntegerConstant)) {
            switch (node.operator.type) {
                case TokenType.ADDITION: {
                    const value = (node.left as IntegerConstant).value + (node.right as IntegerConstant).value;
                    return new IntegerConstant(value);
                }
                case TokenType.NEGATION: {
                    const value = (node.left as IntegerConstant).value - (node.right as IntegerConstant).value;
                    return new IntegerConstant(value);
                }
                case TokenType.LESS_THAN: {
                    const value = ((node.left as IntegerConstant).value < (node.right as IntegerConstant).value) ? 1 : 0;
                    return new IntegerConstant(value);
                }
                case TokenType.LESS_OR_EQUALS: {
                    const value = ((node.left as IntegerConstant).value <= (node.right as IntegerConstant).value) ? 1 : 0;
                    return new IntegerConstant(value);
                }
                case TokenType.GREATER_THAN: {
                    const value = ((node.left as IntegerConstant).value > (node.right as IntegerConstant).value) ? 1 : 0;
                    return new IntegerConstant(value);
                }
                case TokenType.GREATER_OR_EQUALS: {
                    const value = ((node.left as IntegerConstant).value >= (node.right as IntegerConstant).value) ? 1 : 0;
                    return new IntegerConstant(value);
                }
                // these should follow the CPU/ALU behaviour
                case TokenType.MULTIPLICATION: {
                    const value = (node.left as IntegerConstant).value * (node.right as IntegerConstant).value;
                    return new IntegerConstant(value);
                }
                // IR would be way better for this
                case TokenType.DIVISION: {
                    const value = Math.floor((node.left as IntegerConstant).value / (node.right as IntegerConstant).value);
                    return new IntegerConstant(value);
                }
            }
        }
        return node;
    }
}
