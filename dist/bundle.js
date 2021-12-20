var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("Token/TokenType", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const bit = (n) => Math.pow(2, n);
    var TokenType;
    (function (TokenType) {
        TokenType[TokenType["EOF"] = 0] = "EOF";
        TokenType[TokenType["UNKOWN"] = bit(0)] = "UNKOWN";
        TokenType[TokenType["LEFT_BRACE"] = bit(1)] = "LEFT_BRACE";
        TokenType[TokenType["RIGHT_BRACE"] = bit(2)] = "RIGHT_BRACE";
        TokenType[TokenType["LEFT_PAREN"] = bit(3)] = "LEFT_PAREN";
        TokenType[TokenType["RIGHT_PAREN"] = bit(4)] = "RIGHT_PAREN";
        TokenType[TokenType["COMMA"] = bit(5)] = "COMMA";
        TokenType[TokenType["SEMI_COLON"] = bit(6)] = "SEMI_COLON";
        TokenType[TokenType["COLON"] = bit(7)] = "COLON";
        TokenType[TokenType["QUESTION_MARK"] = bit(8)] = "QUESTION_MARK";
        TokenType[TokenType["NEGATION"] = bit(9)] = "NEGATION";
        TokenType[TokenType["ADDITION"] = bit(10)] = "ADDITION";
        TokenType[TokenType["MULTIPLICATION"] = bit(11)] = "MULTIPLICATION";
        TokenType[TokenType["DIVISION"] = bit(12)] = "DIVISION";
        TokenType[TokenType["MODULO"] = bit(13)] = "MODULO";
        TokenType[TokenType["BITWISE_NOT"] = bit(14)] = "BITWISE_NOT";
        TokenType[TokenType["BITWISE_OR"] = bit(15)] = "BITWISE_OR";
        TokenType[TokenType["BITWISE_AND"] = bit(16)] = "BITWISE_AND";
        TokenType[TokenType["BITWISE_XOR"] = bit(17)] = "BITWISE_XOR";
        TokenType[TokenType["LOGICAL_NOT"] = bit(18)] = "LOGICAL_NOT";
        TokenType[TokenType["LOGICAL_AND"] = bit(19)] = "LOGICAL_AND";
        TokenType[TokenType["LOGICAL_OR"] = bit(20)] = "LOGICAL_OR";
        TokenType[TokenType["ASSIGN"] = bit(21)] = "ASSIGN";
        TokenType[TokenType["EQUALS"] = bit(22)] = "EQUALS";
        TokenType[TokenType["NOT_EQUALS"] = bit(23)] = "NOT_EQUALS";
        TokenType[TokenType["LESS_THAN"] = bit(24)] = "LESS_THAN";
        TokenType[TokenType["LESS_OR_EQUALS"] = bit(25)] = "LESS_OR_EQUALS";
        TokenType[TokenType["GREATER_THAN"] = bit(26)] = "GREATER_THAN";
        TokenType[TokenType["GREATER_OR_EQUALS"] = bit(27)] = "GREATER_OR_EQUALS";
        TokenType[TokenType["KEYWORD"] = bit(28)] = "KEYWORD";
        TokenType[TokenType["IDENTIFIER"] = bit(29)] = "IDENTIFIER";
        TokenType[TokenType["INTEGER_LITERAL"] = bit(30)] = "INTEGER_LITERAL";
        TokenType[TokenType["FLOAT_LITERAL"] = bit(31)] = "FLOAT_LITERAL";
        // helper types - represents multiple types
        TokenType[TokenType["UNARY_OP"] = TokenType.BITWISE_NOT | TokenType.NEGATION | TokenType.LOGICAL_NOT] = "UNARY_OP";
        TokenType[TokenType["ADDITIVE"] = TokenType.NEGATION | TokenType.ADDITION] = "ADDITIVE";
        TokenType[TokenType["TERM"] = TokenType.MULTIPLICATION | TokenType.DIVISION | TokenType.MODULO] = "TERM";
        TokenType[TokenType["RELATIONAL"] = TokenType.LESS_THAN | TokenType.LESS_OR_EQUALS | TokenType.GREATER_THAN | TokenType.GREATER_OR_EQUALS] = "RELATIONAL";
        TokenType[TokenType["EQUALITY"] = TokenType.EQUALS | TokenType.NOT_EQUALS] = "EQUALITY";
        TokenType[TokenType["BINARY_OP"] = TokenType.TERM | TokenType.ADDITIVE | TokenType.RELATIONAL | TokenType.EQUALITY] = "BINARY_OP";
    })(TokenType || (TokenType = {}));
    ;
    exports.default = TokenType;
});
define("Token/IToken", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("FileInfo/IFileInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("FileInfo/index", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Token/Token", ["require", "exports", "Token/TokenType"], function (require, exports, TokenType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TokenType_1 = __importDefault(TokenType_1);
    class Token {
        constructor(type, lexeme, info = { col: 0, line: 0, name: '[unknown]' }) {
            this.type = type;
            this.lexeme = lexeme;
            this.file = info.name;
            this.line = info.line;
            this.col = info.col;
        }
        toJSON() {
            return {
                lexeme: this.lexeme,
                type: TokenType_1.default[this.type],
                file: this.file,
                line: this.line,
                col: this.col,
            };
        }
    }
    exports.default = Token;
});
define("Token/index", ["require", "exports", "Token/Token", "Token/TokenType"], function (require, exports, Token_1, TokenType_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenType = exports.Token = void 0;
    Token_1 = __importDefault(Token_1);
    TokenType_2 = __importDefault(TokenType_2);
    exports.Token = Token_1.default;
    exports.TokenType = TokenType_2.default;
});
define("TokenStream/splitTokenTypes", ["require", "exports", "Token/index"], function (require, exports, Token_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // based on Number.MAX_SAFE_INTEGER
    const TokenTypeMax = 52;
    function splitTokenTypes(type) {
        const types = [];
        for (let i = 0, bit = 0; i < TokenTypeMax; i++) {
            bit = Math.pow(2, i);
            const test = type & bit;
            if (test) {
                types.push(Token_2.TokenType[bit]);
            }
        }
        return types.join('|');
    }
    exports.default = splitTokenTypes;
});
define("Error/CompilerError", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CompilerError extends Error {
    }
    exports.default = CompilerError;
});
define("Error/EOFError", ["require", "exports", "Error/CompilerError"], function (require, exports, CompilerError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    CompilerError_1 = __importDefault(CompilerError_1);
    class EOFError extends CompilerError_1.default {
    }
    exports.default = EOFError;
});
define("Error/IndexOutOfBoundsError", ["require", "exports", "Error/CompilerError"], function (require, exports, CompilerError_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    CompilerError_2 = __importDefault(CompilerError_2);
    class IndexOutOfBoundsError extends CompilerError_2.default {
    }
    exports.default = IndexOutOfBoundsError;
});
define("Error/index", ["require", "exports", "Error/CompilerError", "Error/EOFError", "Error/IndexOutOfBoundsError"], function (require, exports, CompilerError_3, EOFError_1, IndexOutOfBoundsError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IndexOutOfBoundsError = exports.EOFError = exports.CompilerError = void 0;
    CompilerError_3 = __importDefault(CompilerError_3);
    EOFError_1 = __importDefault(EOFError_1);
    IndexOutOfBoundsError_1 = __importDefault(IndexOutOfBoundsError_1);
    exports.CompilerError = CompilerError_3.default;
    exports.EOFError = EOFError_1.default;
    exports.IndexOutOfBoundsError = IndexOutOfBoundsError_1.default;
});
define("TokenStream/ParseError", ["require", "exports", "Error/index"], function (require, exports, Error_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParseError extends Error_1.CompilerError {
        constructor(message, details, token, stream) {
            super(message);
            this.details = details;
            this.token = token;
            this.stream = stream;
        }
        toString() {
            return this.message + '\n' + this.details;
        }
    }
    exports.default = ParseError;
});
define("TokenStream/TokenStream", ["require", "exports", "TokenStream/splitTokenTypes", "Token/index", "TokenStream/ParseError"], function (require, exports, splitTokenTypes_1, Token_3, ParseError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    splitTokenTypes_1 = __importDefault(splitTokenTypes_1);
    ParseError_1 = __importDefault(ParseError_1);
    class TokenStream {
        constructor(tokens) {
            this.tokens = tokens;
            this._index = 0;
            // sniff filename if possible
            const filename = tokens[0] && tokens[0].file;
            // create a fake token to signal EOF but with a valid Token instance
            this.EOFToken = new Token_3.Token(Token_3.TokenType.EOF, '[eof]', {
                name: filename || '[eof]',
                line: 0,
                col: 0
            });
        }
        get index() {
            return this._index;
        }
        set index(value) {
            this._index = value;
            if (this._index > this.tokens.length) {
                this._index = this.tokens.length;
            }
        }
        get eof() {
            return this.index === this.tokens.length;
        }
        peek(offset = 0) {
            return this.tokens[this.index + offset] || this.EOFToken;
        }
        next() {
            return this.tokens[this.index++] || this.EOFToken;
        }
        expect(type, message) {
            const token = this.peek();
            if (token.type & type) {
                return this.next();
            }
            return this.panic(token, (message) ? message : type);
        }
        /**
         * @throws {Error}
         */
        panic(token, type) {
            const msg = (typeof type === 'string') ? type : splitTokenTypes_1.default(type);
            throw new ParseError_1.default(`ParseError in '${token.file}' at ${token.line}:${token.col}`, this.friendlyError(token, `expected '${msg}' instead got '${Token_3.TokenType[token.type]}' `), token, this);
        }
        /**
         * Generate a user friendly error message based on the current state and given token
         * #NOTE: this .filter() could be optimised with just using a normal for loop
         * @param token
         */
        friendlyError(token, message) {
            if (this.tokens.indexOf(token) === -1) {
                return 'given token does not exist in stream';
            }
            // gather all tokens up to 2 lines before the passed token
            const lines = [token.line - 2, token.line - 1, token.line].filter(line => line > 0);
            const output = lines.map((line) => {
                return `${line}| ` + this.tokens.filter((token) => token.line === line).reduce((str, token, index, array) => {
                    const indent = (token.col - 1) - str.length;
                    const needsSpace = index !== 0 && (array[index - 1].type === Token_3.TokenType.KEYWORD || array[index - 1].type === Token_3.TokenType.IDENTIFIER || array[index - 1].type === Token_3.TokenType.COMMA) && (token.type === Token_3.TokenType.IDENTIFIER || token.type === Token_3.TokenType.KEYWORD);
                    return str + (needsSpace ? ' ' : '') + ' '.repeat((indent >= 0) ? indent : 0) + token.lexeme;
                }, '');
            });
            // insert big arrow to faulty token
            const prefix = ' '.repeat(token.line.toString().length) + '  ';
            const extra = ' '.repeat(token.col - 1) + '^'.repeat(token.lexeme.length);
            output.push(prefix + extra + '\n' + message);
            return output.join('\n');
        }
    }
    exports.default = TokenStream;
});
define("TokenStream/index", ["require", "exports", "TokenStream/TokenStream"], function (require, exports, TokenStream_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TokenStream = void 0;
    TokenStream_1 = __importDefault(TokenStream_1);
    exports.TokenStream = TokenStream_1.default;
});
define("AST/INode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("AST/ReturnStatement", ["require", "exports", "AST/Statement"], function (require, exports, Statement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Statement_1 = __importDefault(Statement_1);
    class ReturnStatement extends Statement_1.default {
        constructor(expression, info = {}) {
            super(info);
            this.expression = expression;
        }
        accept(visitor) {
            this.expression.accept(visitor);
            visitor.visit(this);
        }
        get [Symbol.toStringTag]() {
            return 'ReturnStatement';
        }
    }
    exports.default = ReturnStatement;
});
define("AST/IConstant", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("AST/Constant", ["require", "exports", "AST/Expression"], function (require, exports, Expression_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Expression_1 = __importDefault(Expression_1);
    class Constant extends Expression_1.default {
        constructor(type, value, info = {}) {
            super(info);
            this.type = type;
            this.value = value;
        }
        get [Symbol.toStringTag]() {
            return 'Constant';
        }
    }
    exports.default = Constant;
});
define("AST/IntegerConstant", ["require", "exports", "AST/Constant"], function (require, exports, Constant_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Constant_1 = __importDefault(Constant_1);
    class IntegerConstant extends Constant_1.default {
        constructor(value, info = {}) {
            super('int16_t', value, info);
        }
        get [Symbol.toStringTag]() {
            return 'IntegerConstant';
        }
    }
    exports.default = IntegerConstant;
});
define("AST/FunctionDeclaration", ["require", "exports", "AST/Node", "AST/ReturnStatement", "AST/IntegerConstant"], function (require, exports, Node_1, ReturnStatement_1, IntegerConstant_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Node_1 = __importDefault(Node_1);
    ReturnStatement_1 = __importDefault(ReturnStatement_1);
    IntegerConstant_1 = __importDefault(IntegerConstant_1);
    class FunctionDeclaration extends Node_1.default {
        constructor(type, name, statements, info = {}) {
            super(info);
            this.type = type;
            this.name = name;
            this.statements = statements;
            // implicitly return 0 if the last statement is not a return statement
            const last = this.statements[this.statements.length - 1];
            if (!(last instanceof ReturnStatement_1.default)) {
                const value = new IntegerConstant_1.default(0);
                const statement = new ReturnStatement_1.default(value);
                this.statements.push(statement);
            }
        }
        accept(visitor) {
            visitor.visit(this);
            this.statements.forEach(statement => statement.accept(visitor));
        }
        get [Symbol.toStringTag]() {
            return 'FunctionDeclaration';
        }
    }
    exports.default = FunctionDeclaration;
});
define("AST/Program", ["require", "exports", "AST/Node"], function (require, exports, Node_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Node_2 = __importDefault(Node_2);
    class Program extends Node_2.default {
        constructor(declarations, info = {}) {
            super(info);
            this.declarations = declarations;
        }
        accept(visitor) {
            this.declarations.forEach(declaration => declaration.accept(visitor));
            visitor.visit(this);
        }
        get [Symbol.toStringTag]() {
            return 'Program';
        }
    }
    exports.default = Program;
});
define("AST/Declaration", ["require", "exports", "AST/Statement"], function (require, exports, Statement_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Statement_2 = __importDefault(Statement_2);
    class Declaration extends Statement_2.default {
        constructor(name, expression, info = {}) {
            super(info);
            this.name = name;
            this.expression = expression;
        }
        accept(visitor) {
            if (this.expression) {
                this.expression.accept(visitor);
            }
            visitor.visit(this);
        }
        get [Symbol.toStringTag]() {
            return 'Declaration';
        }
    }
    exports.default = Declaration;
});
define("AST/BinaryOp", ["require", "exports", "AST/Expression"], function (require, exports, Expression_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Expression_2 = __importDefault(Expression_2);
    class BinaryOp extends Expression_2.default {
        constructor(operator, left, right, info = {}) {
            super(info);
            this.operator = operator;
            this.left = left;
            this.right = right;
        }
        accept(visitor) {
            this.right.accept(visitor);
            this.left.accept(visitor);
            visitor.visit(this);
        }
        get [Symbol.toStringTag]() {
            return 'BinaryOp';
        }
    }
    exports.default = BinaryOp;
});
define("AST/UnaryOp", ["require", "exports", "AST/Expression"], function (require, exports, Expression_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Expression_3 = __importDefault(Expression_3);
    class UnaryOp extends Expression_3.default {
        constructor(operator, expression, info = {}) {
            super(info);
            this.operator = operator;
            this.expression = expression;
        }
        accept(visitor) {
            this.expression.accept(visitor);
            visitor.visit(this);
        }
        get [Symbol.toStringTag]() {
            return 'UnaryOp';
        }
    }
    exports.default = UnaryOp;
});
define("AST/VariableReference", ["require", "exports", "AST/Expression"], function (require, exports, Expression_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Expression_4 = __importDefault(Expression_4);
    class VariableReference extends Expression_4.default {
        constructor(name, info = {}) {
            super(info);
            this.name = name;
        }
        accept(visitor) {
            visitor.visit(this);
        }
        get [Symbol.toStringTag]() {
            return 'VariableReference';
        }
    }
    exports.default = VariableReference;
});
define("AST/index", ["require", "exports", "AST/Node", "AST/Program", "AST/FunctionDeclaration", "AST/Statement", "AST/Declaration", "AST/ReturnStatement", "AST/Expression", "AST/Assignment", "AST/BinaryOp", "AST/UnaryOp", "AST/VariableReference", "AST/Constant", "AST/IntegerConstant"], function (require, exports, Node_3, Program_1, FunctionDeclaration_1, Statement_3, Declaration_1, ReturnStatement_2, Expression_5, Assignment_1, BinaryOp_1, UnaryOp_1, VariableReference_1, Constant_2, IntegerConstant_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegerConstant = exports.Constant = exports.VariableReference = exports.UnaryOp = exports.BinaryOp = exports.Assignment = exports.Expression = exports.ReturnStatement = exports.Declaration = exports.Statement = exports.FunctionDeclaration = exports.Program = exports.Node = void 0;
    Node_3 = __importDefault(Node_3);
    Program_1 = __importDefault(Program_1);
    FunctionDeclaration_1 = __importDefault(FunctionDeclaration_1);
    Statement_3 = __importDefault(Statement_3);
    Declaration_1 = __importDefault(Declaration_1);
    ReturnStatement_2 = __importDefault(ReturnStatement_2);
    Expression_5 = __importDefault(Expression_5);
    Assignment_1 = __importDefault(Assignment_1);
    BinaryOp_1 = __importDefault(BinaryOp_1);
    UnaryOp_1 = __importDefault(UnaryOp_1);
    VariableReference_1 = __importDefault(VariableReference_1);
    Constant_2 = __importDefault(Constant_2);
    IntegerConstant_2 = __importDefault(IntegerConstant_2);
    exports.Node = Node_3.default;
    exports.Program = Program_1.default;
    exports.FunctionDeclaration = FunctionDeclaration_1.default;
    exports.Statement = Statement_3.default;
    exports.Declaration = Declaration_1.default;
    exports.ReturnStatement = ReturnStatement_2.default;
    exports.Expression = Expression_5.default;
    exports.Assignment = Assignment_1.default;
    exports.BinaryOp = BinaryOp_1.default;
    exports.UnaryOp = UnaryOp_1.default;
    exports.VariableReference = VariableReference_1.default;
    exports.Constant = Constant_2.default;
    exports.IntegerConstant = IntegerConstant_2.default;
});
define("Visitor/IVisitor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Visitor/Visitor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Visitor {
        constructor() {
        }
        visit(node) {
            const visitor = this['visit' + node.nodeType];
            if (typeof visitor === 'function') {
                visitor.call(this, node);
            }
        }
    }
    exports.default = Visitor;
});
define("Visitor/index", ["require", "exports", "Visitor/Visitor"], function (require, exports, Visitor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Visitor = void 0;
    Visitor_1 = __importDefault(Visitor_1);
    exports.Visitor = Visitor_1.default;
});
define("AST/Node", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Node {
        constructor(info = {}) {
            this.token = info.token;
            this.stream = info.stream;
        }
        get [Symbol.toStringTag]() {
            return 'Node';
        }
        get nodeType() {
            return Object.prototype.toString.call(this).slice(8, -1);
        }
        friendlyError(message) {
            if (!this.stream || !this.token) {
                return message;
            }
            return this.stream.friendlyError(this.token, message);
        }
        accept(visitor) {
            return visitor.visit(this);
        }
        toJSON() {
            const entries = Object.entries(this).filter(([name, value]) => name !== 'stream' && typeof value !== 'function');
            const map = entries.reduce((map, [name, value]) => { map[name] = value; return map; }, {});
            map.nodeType = this.nodeType;
            return map;
        }
    }
    exports.default = Node;
});
define("AST/Statement", ["require", "exports", "AST/Node"], function (require, exports, Node_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Node_4 = __importDefault(Node_4);
    class Statement extends Node_4.default {
        constructor(info = {}) {
            super(info);
        }
        get [Symbol.toStringTag]() {
            return 'Statement';
        }
    }
    exports.default = Statement;
});
define("AST/Expression", ["require", "exports", "AST/Statement"], function (require, exports, Statement_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Statement_4 = __importDefault(Statement_4);
    class Expression extends Statement_4.default {
        constructor(info = {}) {
            super(info);
        }
        get [Symbol.toStringTag]() {
            return 'Expression';
        }
    }
    exports.default = Expression;
});
define("AST/Assignment", ["require", "exports", "AST/Expression"], function (require, exports, Expression_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Expression_6 = __importDefault(Expression_6);
    class Assignment extends Expression_6.default {
        constructor(name, expression, info = {}) {
            super(info);
            this.name = name;
            this.expression = expression;
        }
        accept(visitor) {
            this.expression.accept(visitor);
            visitor.visit(this);
        }
        get [Symbol.toStringTag]() {
            return 'Assignment';
        }
    }
    exports.default = Assignment;
});
define("Generator/ILabel", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Generator/StackFrame", ["require", "exports", "Error/index"], function (require, exports, Error_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StackFrame {
        constructor() {
            this.offset = 0;
            this.dict = new Map();
        }
        get(key) {
            if (!this.dict.has(key)) {
                throw new Error_2.CompilerError(`Variable does not exist: '${key}'`);
            }
            return this.dict.get(key);
        }
        set(key) {
            if (this.dict.has(key)) {
                throw new Error_2.CompilerError(`Variable already declared: '${key}'`);
            }
            this.dict.set(key, ++this.offset);
            return this.offset;
        }
        exists(key) {
            return this.dict.has(key);
        }
    }
    exports.default = StackFrame;
});
define("Generator/CodeGenVisitor", ["require", "exports", "Token/index", "Visitor/index", "Generator/StackFrame"], function (require, exports, Token_4, Visitor_2, StackFrame_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    StackFrame_1 = __importDefault(StackFrame_1);
    class CodeGenVisitor extends Visitor_2.Visitor {
        constructor() {
            super();
            this.labelId = 0;
            this.text = '';
            this.stackFrame = new StackFrame_1.default();
        }
        get result() {
            return this.text;
        }
        generateLabel(extra = '') {
            const label = `LABEL_${this.labelId++}${(extra) ? `_${extra}` : ''}`;
            const annotate = (msg) => label + `_${msg}`;
            const toString = () => label;
            return {
                label,
                annotate,
                toString,
            };
        }
        visitFunctionDeclaration(node) {
            this.text += `\
${node.name}:
  PUSH BP
  MOV BP, SP
`;
        }
        visitReturnStatement(node) {
            this.text += `\
  POP A
  MOV SP, BP
  POP BP
  ret
`;
        }
        visitDeclaration(node) {
            this.stackFrame.set(node.name);
            if (node.expression) {
                this.text += `\
; var '${node.name}' = <expr>
`;
            }
            else {
                this.text += `\
  PUSH 0 ; var '${node.name}'
`;
            }
        }
        visitVariableReference(node) {
            const offset = this.stackFrame.get(node.name);
            this.text += `\
  PUSH [BP - ${offset}] ; '${node.name}'
`;
        }
        visitAssignment(node) {
            const offset = this.stackFrame.get(node.name);
            this.text += `\
  POP [BP - ${offset}], A ; '${node.name}' = <expr>
`;
        }
        visitBinaryOp(node) {
            let asm = `\
  POP A
  POP B
`;
            switch (node.operator.type) {
                case Token_4.TokenType.MULTIPLICATION: {
                    asm += '  MUL B';
                    asm += '\n';
                    break;
                }
                // see https://github.com/simon987/Much-Assembly-Required/wiki/Instruction-Set#div
                case Token_4.TokenType.DIVISION: {
                    asm += '  MOV Y, 0\n';
                    asm += '  DIV B\n';
                    break;
                }
                // see https://github.com/simon987/Much-Assembly-Required/wiki/Instruction-Set#div
                case Token_4.TokenType.MODULO: {
                    asm += '  MOV Y, 0\n';
                    asm += '  DIV B\n';
                    asm += '  MOV A, Y\n';
                    break;
                }
                case Token_4.TokenType.ADDITION: {
                    asm += '  ADD A, B\n';
                    break;
                }
                case Token_4.TokenType.NEGATION: {
                    asm += '  SUB A, B\n';
                    break;
                }
                case Token_4.TokenType.BITWISE_AND: {
                    asm += '  AND A, B\n';
                }
                case Token_4.TokenType.BITWISE_OR: {
                    asm += '  OR A, B\n';
                }
                case Token_4.TokenType.BITWISE_XOR: {
                    asm += '  XOR A, B\n';
                }
                case Token_4.TokenType.NOT_EQUALS: {
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
                case Token_4.TokenType.EQUALS: {
                    const label = this.generateLabel('equals');
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
                case Token_4.TokenType.LESS_THAN: {
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
                case Token_4.TokenType.LESS_OR_EQUALS: {
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
                case Token_4.TokenType.GREATER_THAN: {
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
                case Token_4.TokenType.GREATER_OR_EQUALS: {
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
                case Token_4.TokenType.LOGICAL_OR: {
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
                case Token_4.TokenType.LOGICAL_AND: {
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
            asm += '  PUSH A\n';
            this.text += asm;
        }
        visitUnaryOp(node) {
            let asm = `\
  POP A
`;
            switch (node.operator.type) {
                case Token_4.TokenType.LOGICAL_NOT: {
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
                case Token_4.TokenType.BITWISE_NOT:
                    asm += `\
  NOT A
`;
                    break;
                case Token_4.TokenType.NEGATION:
                    asm += `\
  NEG A
`;
                    break;
            }
            asm += '  PUSH A\n';
            this.text += asm;
        }
        visitIntegerConstant(node) {
            this.text += `\
  PUSH ${node.value}
`;
        }
    }
    exports.default = CodeGenVisitor;
});
define("Generator/generate", ["require", "exports", "Generator/CodeGenVisitor"], function (require, exports, CodeGenVisitor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    CodeGenVisitor_1 = __importDefault(CodeGenVisitor_1);
    function generate(ast) {
        const visitor = new CodeGenVisitor_1.default();
        ast.accept(visitor);
        return visitor.result;
    }
    exports.default = generate;
});
define("Generator/index", ["require", "exports", "Generator/generate", "Generator/CodeGenVisitor"], function (require, exports, generate_1, CodeGenVisitor_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generate = exports.CodeGenVisitor = void 0;
    generate_1 = __importDefault(generate_1);
    CodeGenVisitor_2 = __importDefault(CodeGenVisitor_2);
    exports.generate = generate_1.default;
    exports.CodeGenVisitor = CodeGenVisitor_2.default;
});
define("Lexer/keywords", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const keywords = [
        'int',
        'return',
        'if',
        'else',
    ];
    exports.default = keywords;
});
define("Lexer/is", ["require", "exports", "Lexer/keywords"], function (require, exports, keywords_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    keywords_1 = __importDefault(keywords_1);
    const is = {
        decimal: (c) => c >= '1' && c <= '9',
        digit: (c) => c === '0' || is.decimal(c),
        hex: (c) => (c >= 'a' && c <= 'f') || (c >= 'A' && c <= 'F') || is.digit(c),
        identifier: (c) => is.identifierStart(c) || is.digit(c),
        identifierStart: (c) => c === '_' || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'),
        keyword: (c) => keywords_1.default.includes(c),
        octal: (c) => c >= '0' && c <= '7',
        integerSuffix: (c) => c === 'u' || c === 'U' || c === 'L' || c === 'l',
    };
    exports.default = is;
});
define("StringStream/StringStream", ["require", "exports", "Error/index"], function (require, exports, Error_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class StringStream {
        /**
         *
         * @param input Input string to wrap the stream
         */
        constructor(input) {
            this.input = input;
            /**
             * internal cursor
             */
            this._cursor = 0;
        }
        get cursor() {
            return this._cursor;
        }
        /**
         * Prevents index from being larger than input length
         *
         * @private
         * @memberof StringStream
         */
        set cursor(value) {
            if (value < 0 || value > this.input.length) {
                throw new Error_3.IndexOutOfBoundsError();
            }
            this._cursor = value;
        }
        /**
         * Represents end of stream flag
         */
        get eof() {
            return this.cursor === this.input.length;
        }
        /**
         * Peek `length` amount of characters and return them as a string
         * @throws {EOFError}
         * @param length
         * @param noThrow suppress EOFError
         */
        peek(length = 1, noThrow = false) {
            if (!noThrow) {
                this.checkEOFError(length);
            }
            const substr = this.input.substr(this.cursor, length);
            return substr;
        }
        /**
         * Consume `length` amount of characters and return them as a string
         * @param length
         * @param noThrow suppress EOFError
         */
        next(length = 1, noThrow = false) {
            if (!noThrow) {
                this.checkEOFError(length);
            }
            const substr = this.input.substr(this.cursor, length);
            this.cursor += length;
            return substr;
        }
        /**
         * Consume characters as long as the condition callback returns true
         * @param condition callback function to determince if more characters should be consumed
         */
        while(condition) {
            let index = 0;
            let substr = '';
            while (!this.eof) {
                if (condition(this.peek(), index++)) {
                    substr += this.next();
                }
                else {
                    break;
                }
            }
            return substr;
        }
        /**
         * @throws {EOFError}
         * @param length
         */
        checkEOFError(length) {
            if (this.cursor + length > this.input.length) {
                const error = new Error_3.EOFError(`#StringStream.next(${length}) - exceeded end of file`);
                throw error;
            }
        }
    }
    exports.default = StringStream;
});
define("StringStream/index", ["require", "exports", "StringStream/StringStream"], function (require, exports, StringStream_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StringStream = void 0;
    StringStream_1 = __importDefault(StringStream_1);
    exports.StringStream = StringStream_1.default;
});
define("Lexer/lex", ["require", "exports", "Lexer/is", "StringStream/index", "Token/index", "Error/index"], function (require, exports, is_1, StringStream_2, Token_5, Error_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    is_1 = __importDefault(is_1);
    function lex(input, filename) {
        const stream = !(input instanceof StringStream_2.StringStream) ? new StringStream_2.StringStream(input) : input;
        const tokens = [];
        const info = {
            name: filename || '[anonymous]',
            line: 1,
            col: 0,
        };
        // helper to keep track of 'info.col'
        const next = () => { info.col++; return stream.next(); };
        const peek = () => { try {
            return stream.peek();
        }
        catch (e) {
            if (e instanceof Error_4.EOFError)
                return '';
            throw e;
        } };
        lexing: while (!stream.eof) {
            const createToken = (type, lexeme) => tokens.push(new Token_5.Token(type, lexeme, { name: info.name, line: info.line, col: info.col }));
            const character = next();
            // ignore whitespace
            switch (character) {
                case '\n':
                    info.line++;
                    info.col = 1;
                case '\r':
                // TODO: support all line endings
                case '\t':
                case '\v':
                case ' ':
                    continue lexing;
            }
            // one letter punctuation
            switch (character) {
                case '{':
                    createToken(Token_5.TokenType.LEFT_BRACE, character);
                    continue lexing;
                case '}':
                    createToken(Token_5.TokenType.RIGHT_BRACE, character);
                    continue lexing;
                case '(':
                    createToken(Token_5.TokenType.LEFT_PAREN, character);
                    continue lexing;
                case ')':
                    createToken(Token_5.TokenType.RIGHT_PAREN, character);
                    continue lexing;
                case ',':
                    createToken(Token_5.TokenType.COMMA, character);
                    continue lexing;
                case ';':
                    createToken(Token_5.TokenType.SEMI_COLON, character);
                    continue lexing;
                case '~':
                    createToken(Token_5.TokenType.BITWISE_NOT, character);
                    continue lexing;
                case '^':
                    createToken(Token_5.TokenType.BITWISE_XOR, character);
                    continue lexing;
                case '%':
                    createToken(Token_5.TokenType.MODULO, character);
                    continue lexing;
                case ':':
                    createToken(Token_5.TokenType.COLON, character);
                    continue lexing;
                case '?':
                    createToken(Token_5.TokenType.QUESTION_MARK, character);
                    continue lexing;
            }
            // multiple letter punctuation
            switch (character) {
                case '=':
                    switch (peek()) {
                        case '=':
                            createToken(Token_5.TokenType.EQUALS, character + next());
                            continue lexing;
                        default:
                            createToken(Token_5.TokenType.ASSIGN, character);
                            continue lexing;
                    }
                case '-':
                    createToken(Token_5.TokenType.NEGATION, character);
                    continue lexing;
                case '!':
                    switch (peek()) {
                        case '=':
                            createToken(Token_5.TokenType.NOT_EQUALS, character + next());
                            continue lexing;
                        default:
                            createToken(Token_5.TokenType.LOGICAL_NOT, character);
                            continue lexing;
                    }
                case '+':
                    createToken(Token_5.TokenType.ADDITION, character);
                    continue lexing;
                case '*':
                    createToken(Token_5.TokenType.MULTIPLICATION, character);
                    continue lexing;
                case '/':
                    createToken(Token_5.TokenType.DIVISION, character);
                    continue lexing;
                case '|':
                    switch (peek()) {
                        case '|':
                            createToken(Token_5.TokenType.LOGICAL_OR, character + next());
                            continue lexing;
                        default:
                            createToken(Token_5.TokenType.BITWISE_OR, character);
                            continue lexing;
                    }
                case '&':
                    switch (peek()) {
                        case '&':
                            createToken(Token_5.TokenType.LOGICAL_AND, character + next());
                            continue lexing;
                        default:
                            createToken(Token_5.TokenType.BITWISE_AND, character);
                            continue lexing;
                    }
                case '<':
                    switch (peek()) {
                        case '=':
                            createToken(Token_5.TokenType.LESS_OR_EQUALS, character + next());
                            continue lexing;
                        default:
                            createToken(Token_5.TokenType.LESS_THAN, character);
                            continue lexing;
                    }
                case '>':
                    switch (peek()) {
                        case '=':
                            createToken(Token_5.TokenType.GREATER_OR_EQUALS, character + next());
                            continue lexing;
                        default:
                            createToken(Token_5.TokenType.GREATER_THAN, character);
                            continue lexing;
                    }
            }
            // integer literal: https://en.cppreference.com/w/c/language/integer_constant
            // float literal: https://en.cppreference.com/w/c/language/floating_constant
            // #TODO: support integer and float suffixes
            // base 10
            if (is_1.default.decimal(character)) {
                const integer = character + stream.while(is_1.default.digit);
                if (peek() === '.') {
                    const dot = next();
                    const float = stream.while(is_1.default.digit);
                    createToken(Token_5.TokenType.FLOAT_LITERAL, integer + dot + float);
                }
                else {
                    createToken(Token_5.TokenType.INTEGER_LITERAL, integer);
                }
                continue lexing;
            }
            // #TODO: support float hexadecimal
            if (character === '0') {
                const char = peek();
                // hexadecimal
                if (char === 'x' || char === 'X') {
                    const x = next();
                    createToken(Token_5.TokenType.INTEGER_LITERAL, character + x + stream.while(is_1.default.hex));
                }
                // octal
                else {
                    createToken(Token_5.TokenType.INTEGER_LITERAL, character + stream.while(is_1.default.octal));
                }
                continue lexing;
            }
            // identifiers and keywords
            if (is_1.default.identifierStart(character)) {
                const lexeme = character + stream.while(is_1.default.identifier);
                const type = (is_1.default.keyword(lexeme)) ? Token_5.TokenType.KEYWORD : Token_5.TokenType.IDENTIFIER;
                createToken(type, lexeme);
                continue lexing;
            }
            createToken(Token_5.TokenType.UNKOWN, character);
        }
        return tokens;
    }
    exports.default = lex;
    ;
});
define("Lexer/index", ["require", "exports", "Lexer/is", "Lexer/keywords", "Lexer/lex"], function (require, exports, is_2, keywords_2, lex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.keywords = exports.is = exports.lex = void 0;
    is_2 = __importDefault(is_2);
    keywords_2 = __importDefault(keywords_2);
    lex_1 = __importDefault(lex_1);
    exports.is = is_2.default;
    exports.keywords = keywords_2.default;
    exports.lex = lex_1.default;
});
define("Optimizer/OptimizerVisitor", ["require", "exports", "AST/index", "Token/index", "Visitor/index"], function (require, exports, AST_1, Token_6, Visitor_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class OptimizerVisitor extends Visitor_3.Visitor {
        constructor() {
            super();
        }
        get result() {
            if (!this.ast) {
                throw new TypeError(`'this.ast' is undefined`);
            }
            return this.ast;
        }
        visit(node) {
            // This is a real dirty way of replacing AST nodes with evaluated nodes
            // proper way would be building a new ast
            // tslint:disable-next-line: forin
            for (const prop in node) {
                const ref = node[prop];
                if (!(ref instanceof AST_1.Node)) {
                    continue;
                }
                if (ref instanceof AST_1.BinaryOp) {
                    node[prop] = this.evaluateBinaryOp(ref);
                }
                else if (ref instanceof AST_1.UnaryOp) {
                    node[prop] = this.evaluateUnaryOp(ref);
                }
            }
            this.ast = node;
            super.visit(node);
        }
        evaluateUnaryOp(node) {
            if ((node.expression instanceof AST_1.IntegerConstant)) {
                switch (node.operator.type) {
                    case Token_6.TokenType.NEGATION: {
                        const value = -(node.expression.value);
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.BITWISE_NOT: {
                        const value = ~(node.expression.value);
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.LOGICAL_NOT: {
                        const value = (node.expression.value) ? 1 : 0;
                        return new AST_1.IntegerConstant(value);
                    }
                }
            }
            return node;
        }
        evaluateBinaryOp(node) {
            if ((node.left instanceof AST_1.IntegerConstant) && (node.right instanceof AST_1.IntegerConstant)) {
                switch (node.operator.type) {
                    case Token_6.TokenType.ADDITION: {
                        const value = node.left.value + node.right.value;
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.NEGATION: {
                        const value = node.left.value - node.right.value;
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.LESS_THAN: {
                        const value = (node.left.value < node.right.value) ? 1 : 0;
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.LESS_OR_EQUALS: {
                        const value = (node.left.value <= node.right.value) ? 1 : 0;
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.GREATER_THAN: {
                        const value = (node.left.value > node.right.value) ? 1 : 0;
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.GREATER_OR_EQUALS: {
                        const value = (node.left.value >= node.right.value) ? 1 : 0;
                        return new AST_1.IntegerConstant(value);
                    }
                    // these should follow the CPU/ALU behaviour
                    case Token_6.TokenType.MULTIPLICATION: {
                        const value = node.left.value * node.right.value;
                        return new AST_1.IntegerConstant(value);
                    }
                    // IR would be way better for this
                    case Token_6.TokenType.DIVISION: {
                        const value = Math.floor(node.left.value / node.right.value);
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.MODULO: {
                        const value = node.left.value % node.right.value;
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.EQUALS: {
                        const value = node.left.value === node.right.value ? 1 : 0;
                        return new AST_1.IntegerConstant(value);
                    }
                    case Token_6.TokenType.NOT_EQUALS: {
                        const value = node.left.value !== node.right.value ? 1 : 0;
                        return new AST_1.IntegerConstant(value);
                    }
                }
            }
            return node;
        }
    }
    exports.default = OptimizerVisitor;
});
define("Optimizer/optimize", ["require", "exports", "Optimizer/OptimizerVisitor"], function (require, exports, OptimizerVisitor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    OptimizerVisitor_1 = __importDefault(OptimizerVisitor_1);
    function optimize(ast) {
        const visitor = new OptimizerVisitor_1.default();
        ast.accept(visitor);
        return ast;
    }
    exports.default = optimize;
});
define("Optimizer/index", ["require", "exports", "Optimizer/optimize", "Optimizer/OptimizerVisitor"], function (require, exports, optimize_1, OptimizerVisitor_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OptimizerVisitor = exports.optimize = void 0;
    optimize_1 = __importDefault(optimize_1);
    OptimizerVisitor_2 = __importDefault(OptimizerVisitor_2);
    exports.optimize = optimize_1.default;
    exports.OptimizerVisitor = OptimizerVisitor_2.default;
});
define("Options/IOptions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("Options/options", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const options = {
        optimize: false,
    };
    exports.default = options;
});
define("Options/index", ["require", "exports", "Options/options"], function (require, exports, options_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.defaultOptions = void 0;
    options_1 = __importDefault(options_1);
    exports.defaultOptions = options_1.default;
});
define("Parser/parseFactor", ["require", "exports", "AST/index", "Token/index", "Parser/parseExpression"], function (require, exports, AST_2, Token_7, parseExpression_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseExpression_1 = __importDefault(parseExpression_1);
    function parseFactor(stream) {
        let expression;
        const peek = stream.peek();
        if (peek.type === Token_7.TokenType.LEFT_PAREN) {
            stream.next();
            // code generation has an error that is to stupid to fix
            if ('default' in parseExpression_1.default) {
                // @ts-ignore
                parseExpression_1.default = parseExpression_1.default['default'];
            }
            expression = parseExpression_1.default(stream);
            stream.expect(Token_7.TokenType.RIGHT_PAREN);
        }
        else if (peek.type & Token_7.TokenType.UNARY_OP) {
            const operator = stream.next();
            const factor = parseFactor(stream);
            expression = new AST_2.UnaryOp(operator, factor, { token: operator, stream });
        }
        else if (peek.type === Token_7.TokenType.IDENTIFIER) {
            const name = stream.next();
            expression = new AST_2.VariableReference(name.lexeme, { token: name, stream });
        }
        else {
            const constant = stream.expect(Token_7.TokenType.INTEGER_LITERAL);
            expression = new AST_2.IntegerConstant(Number.parseInt(constant.lexeme), { token: constant, stream });
        }
        return expression;
    }
    exports.default = parseFactor;
    ;
});
define("Parser/parseTerm", ["require", "exports", "AST/index", "Token/index", "Parser/parseFactor"], function (require, exports, AST_3, Token_8, parseFactor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseFactor_1 = __importDefault(parseFactor_1);
    function parseTerm(stream) {
        let factor = parseFactor_1.default(stream);
        while (stream.peek().type & Token_8.TokenType.TERM) {
            const operator = stream.next();
            const right = parseFactor_1.default(stream);
            factor = new AST_3.BinaryOp(operator, factor, right, { token: factor.token, stream });
        }
        return factor;
    }
    exports.default = parseTerm;
    ;
});
define("Parser/parseAdditive", ["require", "exports", "AST/index", "Token/index", "Parser/parseTerm"], function (require, exports, AST_4, Token_9, parseTerm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseTerm_1 = __importDefault(parseTerm_1);
    ;
    function parseAdditive(stream) {
        let expression = parseTerm_1.default(stream);
        while (stream.peek().type & Token_9.TokenType.ADDITIVE) {
            const operator = stream.next();
            const right = parseTerm_1.default(stream);
            expression = new AST_4.BinaryOp(operator, expression, right, { token: expression.token, stream });
        }
        return expression;
    }
    exports.default = parseAdditive;
    ;
});
define("Parser/parseRelational", ["require", "exports", "AST/index", "Token/index", "Parser/parseAdditive"], function (require, exports, AST_5, Token_10, parseAdditive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseAdditive_1 = __importDefault(parseAdditive_1);
    ;
    function parseLogicalOr(stream) {
        let expression = parseAdditive_1.default(stream);
        while (stream.peek().type & Token_10.TokenType.RELATIONAL) {
            const operator = stream.next();
            const right = parseAdditive_1.default(stream);
            expression = new AST_5.BinaryOp(operator, expression, right, { token: expression.token, stream });
        }
        return expression;
    }
    exports.default = parseLogicalOr;
    ;
});
define("Parser/parseEquality", ["require", "exports", "AST/index", "Token/index", "Parser/parseRelational"], function (require, exports, AST_6, Token_11, parseRelational_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseRelational_1 = __importDefault(parseRelational_1);
    ;
    function parseEquality(stream) {
        let expression = parseRelational_1.default(stream);
        while (stream.peek().type & Token_11.TokenType.EQUALITY) {
            const operator = stream.next();
            const right = parseRelational_1.default(stream);
            expression = new AST_6.BinaryOp(operator, expression, right, { token: expression.token, stream });
        }
        return expression;
    }
    exports.default = parseEquality;
    ;
});
define("Parser/parseLogicalAnd", ["require", "exports", "AST/index", "Token/index", "Parser/parseEquality"], function (require, exports, AST_7, Token_12, parseEquality_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseEquality_1 = __importDefault(parseEquality_1);
    ;
    function parseLogicalOr(stream) {
        let expression = parseEquality_1.default(stream);
        while (stream.peek().type & Token_12.TokenType.LOGICAL_AND) {
            const operator = stream.next();
            const right = parseEquality_1.default(stream);
            expression = new AST_7.BinaryOp(operator, expression, right, { token: expression.token, stream });
        }
        return expression;
    }
    exports.default = parseLogicalOr;
    ;
});
define("Parser/parseLogicalOr", ["require", "exports", "AST/index", "Token/index", "Parser/parseLogicalAnd"], function (require, exports, AST_8, Token_13, parseLogicalAnd_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseLogicalAnd_1 = __importDefault(parseLogicalAnd_1);
    ;
    function parseLogicalOr(stream) {
        let expression = parseLogicalAnd_1.default(stream);
        while (stream.peek().type & Token_13.TokenType.LOGICAL_OR) {
            const operator = stream.next();
            const right = parseLogicalAnd_1.default(stream);
            expression = new AST_8.BinaryOp(operator, expression, right, { token: expression.token, stream });
        }
        return expression;
    }
    exports.default = parseLogicalOr;
    ;
});
define("Parser/parseExpression", ["require", "exports", "AST/index", "Parser/parseLogicalOr", "Token/index"], function (require, exports, AST_9, parseLogicalOr_1, Token_14) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseLogicalOr_1 = __importDefault(parseLogicalOr_1);
    ;
    function parseExpression(stream) {
        let expression;
        if (stream.peek().type === Token_14.TokenType.IDENTIFIER && stream.peek(1).type === Token_14.TokenType.ASSIGN) {
            const name = stream.expect(Token_14.TokenType.IDENTIFIER);
            stream.expect(Token_14.TokenType.ASSIGN);
            const inner = parseExpression(stream);
            expression = new AST_9.Assignment(name.lexeme, inner, { token: name, stream });
        }
        else {
            expression = parseLogicalOr_1.default(stream);
        }
        return expression;
    }
    exports.default = parseExpression;
    ;
});
define("Parser/parseStatement", ["require", "exports", "AST/index", "Token/index", "Parser/parseExpression"], function (require, exports, AST_10, Token_15, parseExpression_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseExpression_2 = __importDefault(parseExpression_2);
    function parseStatement(stream) {
        // create a phony statement to keep the compiler happy
        let statement = new AST_10.Statement({ token: new Token_15.Token(Token_15.TokenType.UNKOWN, '[phony]') });
        const peek = stream.peek();
        if (peek.type === Token_15.TokenType.KEYWORD) {
            if (peek.lexeme === 'int') {
                const type = stream.next();
                const name = stream.expect(Token_15.TokenType.IDENTIFIER);
                let expression;
                if (stream.peek().type !== Token_15.TokenType.SEMI_COLON) {
                    stream.expect(Token_15.TokenType.ASSIGN);
                    expression = parseExpression_2.default(stream);
                }
                statement = new AST_10.Declaration(name.lexeme, expression, { token: name, stream });
            }
            else if (peek.lexeme === 'return') {
                // consume 'return'
                stream.next();
                const expression = parseExpression_2.default(stream);
                statement = new AST_10.ReturnStatement(expression, { token: peek, stream });
            }
            else {
                stream.panic(peek, `keyword 'int'|'return'`);
            }
        }
        else {
            statement = parseExpression_2.default(stream);
        }
        stream.expect(Token_15.TokenType.SEMI_COLON);
        return statement;
    }
    exports.default = parseStatement;
    ;
});
define("Parser/parseFunctionDeclaration", ["require", "exports", "AST/index", "Token/index", "Parser/parseStatement"], function (require, exports, AST_11, Token_16, parseStatement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseStatement_1 = __importDefault(parseStatement_1);
    function parseFunctionDeclaration(stream) {
        const type = stream.expect(Token_16.TokenType.KEYWORD | Token_16.TokenType.IDENTIFIER);
        const identifier = stream.expect(Token_16.TokenType.IDENTIFIER);
        stream.expect(Token_16.TokenType.LEFT_PAREN);
        // ignore argument list
        while (!stream.eof && stream.peek().type !== Token_16.TokenType.RIGHT_PAREN) {
            stream.next();
        }
        stream.expect(Token_16.TokenType.RIGHT_PAREN);
        stream.expect(Token_16.TokenType.LEFT_BRACE);
        const statements = [];
        while (stream.peek().type !== Token_16.TokenType.RIGHT_BRACE) {
            const statement = parseStatement_1.default(stream);
            statements.push(statement);
        }
        stream.expect(Token_16.TokenType.RIGHT_BRACE);
        return new AST_11.FunctionDeclaration(type.lexeme, identifier.lexeme, statements, { token: type, stream });
    }
    exports.default = parseFunctionDeclaration;
    ;
});
define("Parser/parseProgram", ["require", "exports", "AST/index", "Parser/parseFunctionDeclaration"], function (require, exports, AST_12, parseFunctionDeclaration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseFunctionDeclaration_1 = __importDefault(parseFunctionDeclaration_1);
    function parseProgram(stream) {
        const functions = [];
        while (!stream.eof) {
            functions.push(parseFunctionDeclaration_1.default(stream));
        }
        return new AST_12.Program(functions, { token: functions[0].token || stream.EOFToken, stream });
    }
    exports.default = parseProgram;
    ;
});
define("Parser/parse", ["require", "exports", "TokenStream/index", "Parser/parseProgram"], function (require, exports, TokenStream_2, parseProgram_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseProgram_1 = __importDefault(parseProgram_1);
    function parse(stream) {
        stream = !(stream instanceof TokenStream_2.TokenStream) ? new TokenStream_2.TokenStream(stream) : stream;
        return parseProgram_1.default(stream);
    }
    exports.default = parse;
});
define("Parser/index", ["require", "exports", "Parser/parse", "Parser/parseProgram", "Parser/parseFunctionDeclaration", "Parser/parseStatement", "Parser/parseExpression", "Parser/parseLogicalOr", "Parser/parseLogicalAnd", "Parser/parseEquality", "Parser/parseRelational", "Parser/parseAdditive", "Parser/parseTerm", "Parser/parseFactor"], function (require, exports, parse_1, parseProgram_2, parseFunctionDeclaration_2, parseStatement_2, parseExpression_3, parseLogicalOr_2, parseLogicalAnd_2, parseEquality_2, parseRelational_2, parseAdditive_2, parseTerm_2, parseFactor_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseFactor = exports.parseTerm = exports.parseAdditive = exports.parseRelational = exports.parseEquality = exports.parseLogicalAnd = exports.parseLogicalOr = exports.parseExpression = exports.parseStatement = exports.parseFunctionDeclaration = exports.parseProgram = exports.parse = void 0;
    parse_1 = __importDefault(parse_1);
    parseProgram_2 = __importDefault(parseProgram_2);
    parseFunctionDeclaration_2 = __importDefault(parseFunctionDeclaration_2);
    parseStatement_2 = __importDefault(parseStatement_2);
    parseExpression_3 = __importDefault(parseExpression_3);
    parseLogicalOr_2 = __importDefault(parseLogicalOr_2);
    parseLogicalAnd_2 = __importDefault(parseLogicalAnd_2);
    parseEquality_2 = __importDefault(parseEquality_2);
    parseRelational_2 = __importDefault(parseRelational_2);
    parseAdditive_2 = __importDefault(parseAdditive_2);
    parseTerm_2 = __importDefault(parseTerm_2);
    parseFactor_2 = __importDefault(parseFactor_2);
    exports.parse = parse_1.default;
    exports.parseProgram = parseProgram_2.default;
    exports.parseFunctionDeclaration = parseFunctionDeclaration_2.default;
    exports.parseStatement = parseStatement_2.default;
    exports.parseExpression = parseExpression_3.default;
    exports.parseLogicalOr = parseLogicalOr_2.default;
    exports.parseLogicalAnd = parseLogicalAnd_2.default;
    exports.parseEquality = parseEquality_2.default;
    exports.parseRelational = parseRelational_2.default;
    exports.parseAdditive = parseAdditive_2.default;
    exports.parseTerm = parseTerm_2.default;
    exports.parseFactor = parseFactor_2.default;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1Rva2VuL1Rva2VuVHlwZS50cyIsIi4uL3NyYy9Ub2tlbi9JVG9rZW4udHMiLCIuLi9zcmMvRmlsZUluZm8vSUZpbGVJbmZvLnRzIiwiLi4vc3JjL0ZpbGVJbmZvL2luZGV4LnRzIiwiLi4vc3JjL1Rva2VuL1Rva2VuLnRzIiwiLi4vc3JjL1Rva2VuL2luZGV4LnRzIiwiLi4vc3JjL1Rva2VuU3RyZWFtL3NwbGl0VG9rZW5UeXBlcy50cyIsIi4uL3NyYy9FcnJvci9Db21waWxlckVycm9yLnRzIiwiLi4vc3JjL0Vycm9yL0VPRkVycm9yLnRzIiwiLi4vc3JjL0Vycm9yL0luZGV4T3V0T2ZCb3VuZHNFcnJvci50cyIsIi4uL3NyYy9FcnJvci9pbmRleC50cyIsIi4uL3NyYy9Ub2tlblN0cmVhbS9QYXJzZUVycm9yLnRzIiwiLi4vc3JjL1Rva2VuU3RyZWFtL1Rva2VuU3RyZWFtLnRzIiwiLi4vc3JjL1Rva2VuU3RyZWFtL2luZGV4LnRzIiwiLi4vc3JjL0FTVC9JTm9kZS50cyIsIi4uL3NyYy9BU1QvUmV0dXJuU3RhdGVtZW50LnRzIiwiLi4vc3JjL0FTVC9JQ29uc3RhbnQudHMiLCIuLi9zcmMvQVNUL0NvbnN0YW50LnRzIiwiLi4vc3JjL0FTVC9JbnRlZ2VyQ29uc3RhbnQudHMiLCIuLi9zcmMvQVNUL0Z1bmN0aW9uRGVjbGFyYXRpb24udHMiLCIuLi9zcmMvQVNUL1Byb2dyYW0udHMiLCIuLi9zcmMvQVNUL0RlY2xhcmF0aW9uLnRzIiwiLi4vc3JjL0FTVC9CaW5hcnlPcC50cyIsIi4uL3NyYy9BU1QvVW5hcnlPcC50cyIsIi4uL3NyYy9BU1QvVmFyaWFibGVSZWZlcmVuY2UudHMiLCIuLi9zcmMvQVNUL2luZGV4LnRzIiwiLi4vc3JjL1Zpc2l0b3IvSVZpc2l0b3IudHMiLCIuLi9zcmMvVmlzaXRvci9WaXNpdG9yLnRzIiwiLi4vc3JjL1Zpc2l0b3IvaW5kZXgudHMiLCIuLi9zcmMvQVNUL05vZGUudHMiLCIuLi9zcmMvQVNUL1N0YXRlbWVudC50cyIsIi4uL3NyYy9BU1QvRXhwcmVzc2lvbi50cyIsIi4uL3NyYy9BU1QvQXNzaWdubWVudC50cyIsIi4uL3NyYy9HZW5lcmF0b3IvSUxhYmVsLnRzIiwiLi4vc3JjL0dlbmVyYXRvci9TdGFja0ZyYW1lLnRzIiwiLi4vc3JjL0dlbmVyYXRvci9Db2RlR2VuVmlzaXRvci50cyIsIi4uL3NyYy9HZW5lcmF0b3IvZ2VuZXJhdGUudHMiLCIuLi9zcmMvR2VuZXJhdG9yL2luZGV4LnRzIiwiLi4vc3JjL0xleGVyL2tleXdvcmRzLnRzIiwiLi4vc3JjL0xleGVyL2lzLnRzIiwiLi4vc3JjL1N0cmluZ1N0cmVhbS9TdHJpbmdTdHJlYW0udHMiLCIuLi9zcmMvU3RyaW5nU3RyZWFtL2luZGV4LnRzIiwiLi4vc3JjL0xleGVyL2xleC50cyIsIi4uL3NyYy9MZXhlci9pbmRleC50cyIsIi4uL3NyYy9PcHRpbWl6ZXIvT3B0aW1pemVyVmlzaXRvci50cyIsIi4uL3NyYy9PcHRpbWl6ZXIvb3B0aW1pemUudHMiLCIuLi9zcmMvT3B0aW1pemVyL2luZGV4LnRzIiwiLi4vc3JjL09wdGlvbnMvSU9wdGlvbnMudHMiLCIuLi9zcmMvT3B0aW9ucy9vcHRpb25zLnRzIiwiLi4vc3JjL09wdGlvbnMvaW5kZXgudHMiLCIuLi9zcmMvUGFyc2VyL3BhcnNlRmFjdG9yLnRzIiwiLi4vc3JjL1BhcnNlci9wYXJzZVRlcm0udHMiLCIuLi9zcmMvUGFyc2VyL3BhcnNlQWRkaXRpdmUudHMiLCIuLi9zcmMvUGFyc2VyL3BhcnNlUmVsYXRpb25hbC50cyIsIi4uL3NyYy9QYXJzZXIvcGFyc2VFcXVhbGl0eS50cyIsIi4uL3NyYy9QYXJzZXIvcGFyc2VMb2dpY2FsQW5kLnRzIiwiLi4vc3JjL1BhcnNlci9wYXJzZUxvZ2ljYWxPci50cyIsIi4uL3NyYy9QYXJzZXIvcGFyc2VFeHByZXNzaW9uLnRzIiwiLi4vc3JjL1BhcnNlci9wYXJzZVN0YXRlbWVudC50cyIsIi4uL3NyYy9QYXJzZXIvcGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uLnRzIiwiLi4vc3JjL1BhcnNlci9wYXJzZVByb2dyYW0udHMiLCIuLi9zcmMvUGFyc2VyL3BhcnNlLnRzIiwiLi4vc3JjL1BhcnNlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7SUFDQSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsU0FBQSxDQUFDLEVBQUksQ0FBQyxDQUFBLENBQUM7SUFFbEMsSUFBSyxTQW1ESjtJQW5ERCxXQUFLLFNBQVM7UUFDVix1Q0FBTyxDQUFBO1FBQ1AsZ0NBQVMsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFBLENBQUE7UUFFZixvQ0FBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLGdCQUFBLENBQUE7UUFDbkIscUNBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQkFBQSxDQUFBO1FBQ3BCLG9DQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsZ0JBQUEsQ0FBQTtRQUNuQixxQ0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLGlCQUFBLENBQUE7UUFFcEIsK0JBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFBLENBQUE7UUFDZCxvQ0FBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLGdCQUFBLENBQUE7UUFDbkIsK0JBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFBLENBQUE7UUFDZCx1Q0FBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxtQkFBQSxDQUFBO1FBRXRCLGtDQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsY0FBQSxDQUFBO1FBQ2pCLGtDQUFXLEdBQUcsQ0FBQyxFQUFFLENBQUMsY0FBQSxDQUFBO1FBQ2xCLHdDQUFpQixHQUFHLENBQUMsRUFBRSxDQUFDLG9CQUFBLENBQUE7UUFDeEIsa0NBQVcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxjQUFBLENBQUE7UUFDbEIsZ0NBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFBLENBQUE7UUFFaEIscUNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxpQkFBQSxDQUFBO1FBQ3JCLG9DQUFhLEdBQUcsQ0FBQyxFQUFFLENBQUMsZ0JBQUEsQ0FBQTtRQUNwQixxQ0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDLGlCQUFBLENBQUE7UUFDckIscUNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxpQkFBQSxDQUFBO1FBRXJCLHFDQUFjLEdBQUcsQ0FBQyxFQUFFLENBQUMsaUJBQUEsQ0FBQTtRQUNyQixxQ0FBYyxHQUFHLENBQUMsRUFBRSxDQUFDLGlCQUFBLENBQUE7UUFDckIsb0NBQWEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxnQkFBQSxDQUFBO1FBRXBCLGdDQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBQSxDQUFBO1FBQ2hCLGdDQUFTLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBQSxDQUFBO1FBQ2hCLG9DQUFhLEdBQUcsQ0FBQyxFQUFFLENBQUMsZ0JBQUEsQ0FBQTtRQUVwQixtQ0FBWSxHQUFHLENBQUMsRUFBRSxDQUFDLGVBQUEsQ0FBQTtRQUNuQix3Q0FBaUIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxvQkFBQSxDQUFBO1FBQ3hCLHNDQUFlLEdBQUcsQ0FBQyxFQUFFLENBQUMsa0JBQUEsQ0FBQTtRQUN0QiwyQ0FBb0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyx1QkFBQSxDQUFBO1FBRTNCLGlDQUFVLEdBQUcsQ0FBQyxFQUFFLENBQUMsYUFBQSxDQUFBO1FBQ2pCLG9DQUFhLEdBQUcsQ0FBQyxFQUFFLENBQUMsZ0JBQUEsQ0FBQTtRQUVwQix5Q0FBa0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxxQkFBQSxDQUFBO1FBQ3pCLHVDQUFnQixHQUFHLENBQUMsRUFBRSxDQUFDLG1CQUFBLENBQUE7UUFFdkIsMkNBQTJDO1FBQzNDLGtDQUFXLFNBQVMsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsV0FBVyxjQUFBLENBQUE7UUFDN0Usa0NBQVcsU0FBUyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUMsUUFBUSxjQUFBLENBQUE7UUFDbEQsOEJBQU8sU0FBUyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLFVBQUEsQ0FBQTtRQUN2RSxvQ0FBYSxTQUFTLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsaUJBQWlCLGdCQUFBLENBQUE7UUFDbEgsa0NBQVcsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsVUFBVSxjQUFBLENBQUE7UUFDbEQsbUNBQVksU0FBUyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsZUFBQSxDQUFBO0lBQy9GLENBQUMsRUFuREksU0FBUyxLQUFULFNBQVMsUUFtRGI7SUFBQSxDQUFDO0lBRUYsa0JBQWUsU0FBUyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUluRHpCLE1BQXFCLEtBQUs7UUFLdEIsWUFBNEIsSUFBTyxFQUFrQixNQUFjLEVBQUUsT0FBa0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQztZQUFoRyxTQUFJLEdBQUosSUFBSSxDQUFHO1lBQWtCLFdBQU0sR0FBTixNQUFNLENBQVE7WUFDL0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDeEIsQ0FBQztRQUVNLE1BQU07WUFDVCxPQUFPO2dCQUNILE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsSUFBSSxFQUFFLG1CQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDMUIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDZixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7YUFDaEIsQ0FBQztRQUNOLENBQUM7S0FDSjtJQXBCRCx3QkFvQkM7Ozs7Ozs7O0lDbEJHLGdCQUxHLGVBQUssQ0FLSDtJQUNMLG9CQUxHLG1CQUFTLENBS0g7Ozs7O0lDTmIsbUNBQW1DO0lBQ25DLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUV4QixTQUF3QixlQUFlLENBQUMsSUFBZTtRQUNuRCxNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7UUFDM0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzNDLEdBQUcsR0FBRyxTQUFBLENBQUMsRUFBSSxDQUFDLENBQUEsQ0FBQztZQUNiLE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7WUFDeEIsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDOUI7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBVkQsa0NBVUM7Ozs7O0lDZEQsTUFBcUIsYUFBYyxTQUFRLEtBQUs7S0FBRztJQUFuRCxnQ0FBbUQ7Ozs7OztJQ0NuRCxNQUFxQixRQUFTLFNBQVEsdUJBQWE7S0FBRztJQUF0RCwyQkFBc0Q7Ozs7OztJQ0F0RCxNQUFxQixxQkFBc0IsU0FBUSx1QkFBYTtLQUFHO0lBQW5FLHdDQUFtRTs7Ozs7Ozs7O0lDRy9ELHdCQUxHLHVCQUFhLENBS0g7SUFDYixtQkFMRyxrQkFBUSxDQUtIO0lBQ1IsZ0NBTEcsK0JBQXFCLENBS0g7Ozs7O0lDRnpCLE1BQXFCLFVBQVcsU0FBUSxxQkFBYTtRQUNqRCxZQUFZLE9BQWUsRUFBUyxPQUFlLEVBQVMsS0FBYSxFQUFTLE1BQW1CO1lBQ2pHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQURpQixZQUFPLEdBQVAsT0FBTyxDQUFRO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQUFTLFdBQU0sR0FBTixNQUFNLENBQWE7UUFFckcsQ0FBQztRQUVNLFFBQVE7WUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDOUMsQ0FBQztLQUNKO0lBUkQsNkJBUUM7Ozs7Ozs7SUNQRCxNQUFxQixXQUFXO1FBZTVCLFlBQW9CLE1BQWdCO1lBQWhCLFdBQU0sR0FBTixNQUFNLENBQVU7WUFkNUIsV0FBTSxHQUFHLENBQUMsQ0FBQztZQWVmLDZCQUE2QjtZQUM3QixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM3QyxvRUFBb0U7WUFDcEUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGFBQUssQ0FBQyxpQkFBUyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUU7Z0JBQzlDLElBQUksRUFBRSxRQUFRLElBQUksT0FBTztnQkFDekIsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsR0FBRyxFQUFFLENBQUM7YUFDVCxDQUFDLENBQUM7UUFDUCxDQUFDO1FBcEJELElBQVksS0FBSztZQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO1FBRUQsSUFBWSxLQUFLLENBQUMsS0FBYTtZQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDcEM7UUFDTCxDQUFDO1FBYUQsSUFBVyxHQUFHO1lBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzdDLENBQUM7UUFFTSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM3RCxDQUFDO1FBRU0sSUFBSTtZQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3RELENBQUM7UUFFTSxNQUFNLENBQUMsSUFBZSxFQUFFLE9BQWdCO1lBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMxQixJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN0QjtZQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBRUQ7O1dBRUc7UUFDSSxLQUFLLENBQUMsS0FBYSxFQUFFLElBQXNCO1lBQzlDLE1BQU0sR0FBRyxHQUFHLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMseUJBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0RSxNQUFNLElBQUksb0JBQVUsQ0FBQyxrQkFBa0IsS0FBSyxDQUFDLElBQUksUUFBUSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxhQUFhLEdBQUcsa0JBQWtCLGlCQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0wsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSxhQUFhLENBQUMsS0FBYSxFQUFFLE9BQWU7WUFDL0MsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDbkMsT0FBTyxzQ0FBc0MsQ0FBQzthQUNqRDtZQUNELDBEQUEwRDtZQUMxRCxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDcEYsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUM5QixPQUFPLEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUU7b0JBQ3hHLE1BQU0sTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO29CQUM1QyxNQUFNLFVBQVUsR0FBRyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssaUJBQVMsQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssaUJBQVMsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssaUJBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssaUJBQVMsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM1UCxPQUFPLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7Z0JBQ2pHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNYLENBQUMsQ0FBQyxDQUFBO1lBRUYsbUNBQW1DO1lBQ25DLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDL0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBRTdDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO0tBQ0o7SUFoRkQsOEJBZ0ZDOzs7Ozs7O0lDbEZHLHNCQUhHLHFCQUFXLENBR0g7Ozs7Ozs7Ozs7SUVHZixNQUFxQixlQUFnQixTQUFRLG1CQUFTO1FBQ2xELFlBQW9CLFVBQXNCLEVBQUUsT0FBd0QsRUFBRTtZQUNsRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFESSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBRTFDLENBQUM7UUFFTSxNQUFNLENBQUMsT0FBaUI7WUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QixDQUFDO1FBRUQsSUFBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDM0IsT0FBTyxpQkFBaUIsQ0FBQztRQUM3QixDQUFDO0tBQ0o7SUFiRCxrQ0FhQzs7Ozs7Ozs7OztJRWRELE1BQXFCLFFBQWtCLFNBQVEsb0JBQVU7UUFDckQsWUFBbUIsSUFBWSxFQUFVLEtBQVEsRUFBRSxPQUFzRCxFQUFFO1lBQ3ZHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQURHLFNBQUksR0FBSixJQUFJLENBQVE7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFHO1FBRWpELENBQUM7UUFFRCxJQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUMzQixPQUFPLFVBQVUsQ0FBQztRQUN0QixDQUFDO0tBQ0o7SUFSRCwyQkFRQzs7Ozs7O0lDVEQsTUFBcUIsZUFBMkMsU0FBUSxrQkFBVztRQUMvRSxZQUFZLEtBQVEsRUFBRSxPQUF3RCxFQUFFO1lBQzVFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxJQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUMzQixPQUFPLGlCQUFpQixDQUFDO1FBQzdCLENBQUM7S0FDSjtJQVJELGtDQVFDOzs7Ozs7OztJQ0pELE1BQXFCLG1CQUFvQixTQUFRLGNBQUk7UUFDakQsWUFBbUIsSUFBWSxFQUFTLElBQVksRUFBUyxVQUF1QixFQUFFLE9BQXdELEVBQUU7WUFDNUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBREcsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUFTLFNBQUksR0FBSixJQUFJLENBQVE7WUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFhO1lBR2hGLHNFQUFzRTtZQUN0RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxDQUFDLElBQUksWUFBWSx5QkFBZSxDQUFDLEVBQUU7Z0JBQ3BDLE1BQU0sS0FBSyxHQUFHLElBQUkseUJBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsTUFBTSxTQUFTLEdBQUcsSUFBSSx5QkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNuQztRQUNMLENBQUM7UUFFTSxNQUFNLENBQUMsT0FBaUI7WUFDM0IsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRUQsSUFBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDM0IsT0FBTyxxQkFBcUIsQ0FBQztRQUNqQyxDQUFDO0tBQ0o7SUFyQkQsc0NBcUJDOzs7Ozs7SUN2QkQsTUFBcUIsT0FBUSxTQUFRLGNBQUk7UUFDckMsWUFBbUIsWUFBbUMsRUFBRSxPQUF3RCxFQUFFO1lBQzlHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQURHLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQUV0RCxDQUFDO1FBRU0sTUFBTSxDQUFDLE9BQWlCO1lBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQzNCLE9BQU8sU0FBUyxDQUFDO1FBQ3JCLENBQUM7S0FDSjtJQWJELDBCQWFDOzs7Ozs7SUNiRCxNQUFxQixXQUFZLFNBQVEsbUJBQVM7UUFDOUMsWUFBbUIsSUFBWSxFQUFTLFVBQXVCLEVBQUUsT0FBd0QsRUFBRTtZQUN2SCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFERyxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQUUvRCxDQUFDO1FBRU0sTUFBTSxDQUFDLE9BQWlCO1lBQzNCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkM7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUMzQixPQUFPLGFBQWEsQ0FBQztRQUN6QixDQUFDO0tBQ0o7SUFmRCw4QkFlQzs7Ozs7O0lDaEJELE1BQXFCLFFBQVMsU0FBUSxvQkFBVTtRQUM1QyxZQUFtQixRQUFnQixFQUFTLElBQWdCLEVBQVMsS0FBaUIsRUFBRSxPQUF3RCxFQUFFO1lBQzlJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQURHLGFBQVEsR0FBUixRQUFRLENBQVE7WUFBUyxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQVMsVUFBSyxHQUFMLEtBQUssQ0FBWTtRQUV0RixDQUFDO1FBRU0sTUFBTSxDQUFDLE9BQWlCO1lBQzNCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQzNCLE9BQU8sVUFBVSxDQUFDO1FBQ3RCLENBQUM7S0FDSjtJQWRELDJCQWNDOzs7Ozs7SUNkRCxNQUFxQixPQUFRLFNBQVEsb0JBQVU7UUFDM0MsWUFBb0IsUUFBZ0IsRUFBVSxVQUFzQixFQUFFLE9BQXdELEVBQUU7WUFDNUgsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBREksYUFBUSxHQUFSLFFBQVEsQ0FBUTtZQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFFcEUsQ0FBQztRQUVNLE1BQU0sQ0FBQyxPQUFpQjtZQUMzQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUMzQixPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO0tBQ0o7SUFiRCwwQkFhQzs7Ozs7O0lDYkQsTUFBcUIsaUJBQWtCLFNBQVEsb0JBQVU7UUFDckQsWUFBbUIsSUFBWSxFQUFFLE9BQXdELEVBQUU7WUFDdkYsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBREcsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUUvQixDQUFDO1FBR00sTUFBTSxDQUFDLE9BQWlCO1lBQzNCLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQzNCLE9BQU8sbUJBQW1CLENBQUM7UUFDL0IsQ0FBQztLQUNKO0lBYkQsb0NBYUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNHRyxlQXJCRyxjQUFJLENBcUJIO0lBRUosa0JBckJHLGlCQUFPLENBcUJIO0lBQ1AsOEJBckJHLDZCQUFtQixDQXFCSDtJQUVuQixvQkFyQkcsbUJBQVMsQ0FxQkg7SUFDVCxzQkFyQkcscUJBQVcsQ0FxQkg7SUFDWCwwQkFyQkcseUJBQWUsQ0FxQkg7SUFFZixxQkFyQkcsb0JBQVUsQ0FxQkg7SUFDVixxQkFyQkcsb0JBQVUsQ0FxQkg7SUFDVixtQkFyQkcsa0JBQVEsQ0FxQkg7SUFDUixrQkFyQkcsaUJBQU8sQ0FxQkg7SUFDUCw0QkFyQkcsMkJBQWlCLENBcUJIO0lBR2pCLG1CQXJCRyxrQkFBUSxDQXFCSDtJQUNSLDBCQXJCRyx5QkFBZSxDQXFCSDs7Ozs7Ozs7O0lFbkNuQixNQUFxQixPQUFPO1FBQ3hCO1FBRUEsQ0FBQztRQUVNLEtBQUssQ0FBQyxJQUFXO1lBQ3BCLE1BQU0sT0FBTyxHQUFJLElBQVksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBd0QsQ0FBQztZQUM5RyxJQUFJLE9BQU8sT0FBTyxLQUFLLFVBQVUsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUI7UUFDTCxDQUFDO0tBQ0o7SUFYRCwwQkFXQzs7Ozs7OztJQ1ZHLGtCQUpHLGlCQUFPLENBSUg7Ozs7O0lDQ1gsTUFBcUIsSUFBSTtRQUlyQixZQUFZLE9BQXdELEVBQUU7WUFDbEUsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM5QixDQUFDO1FBRUQsSUFBVyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7WUFDM0IsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVELElBQVcsUUFBUTtZQUNmLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRU0sYUFBYSxDQUFDLE9BQWU7WUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUM3QixPQUFPLE9BQU8sQ0FBQzthQUNsQjtZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBRU0sTUFBTSxDQUFDLE9BQWlCO1lBQzNCLE9BQU8sT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRU0sTUFBTTtZQUNULE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxLQUFLLEtBQUssVUFBVSxDQUFDLENBQUM7WUFDakgsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQVMsQ0FBQyxDQUFDO1lBQ2xHLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUM3QixPQUFPLEdBQUcsQ0FBQztRQUNmLENBQUM7S0FDSjtJQWxDRCx1QkFrQ0M7Ozs7OztJQ25DRCxNQUFxQixTQUFVLFNBQVEsY0FBSTtRQUN2QyxZQUFZLE9BQXdELEVBQUU7WUFDbEUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hCLENBQUM7UUFFRCxJQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUMzQixPQUFPLFdBQVcsQ0FBQztRQUN2QixDQUFDO0tBQ0o7SUFSRCw0QkFRQzs7Ozs7O0lDUkQsTUFBcUIsVUFBVyxTQUFRLG1CQUFTO1FBQzdDLFlBQVksT0FBd0QsRUFBRTtZQUNsRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEIsQ0FBQztRQUVELElBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQzNCLE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7S0FDSjtJQVJELDZCQVFDOzs7Ozs7SUNQRCxNQUFxQixVQUFXLFNBQVEsb0JBQVU7UUFDOUMsWUFBbUIsSUFBWSxFQUFTLFVBQXNCLEVBQUUsT0FBd0QsRUFBRTtZQUN0SCxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFERyxTQUFJLEdBQUosSUFBSSxDQUFRO1lBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUU5RCxDQUFDO1FBRU0sTUFBTSxDQUFDLE9BQWlCO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQVcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQzNCLE9BQU8sWUFBWSxDQUFDO1FBQ3hCLENBQUM7S0FDSjtJQWJELDZCQWFDOzs7Ozs7Ozs7SUVqQkQsTUFBcUIsVUFBVTtRQUkzQjtZQUhRLFdBQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxTQUFJLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7UUFJekMsQ0FBQztRQUVNLEdBQUcsQ0FBQyxHQUFXO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDckIsTUFBTSxJQUFJLHFCQUFhLENBQUMsNkJBQTZCLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDaEU7WUFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxDQUFDO1FBQy9CLENBQUM7UUFFTSxHQUFHLENBQUMsR0FBVztZQUNsQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQixNQUFNLElBQUkscUJBQWEsQ0FBQywrQkFBK0IsR0FBRyxHQUFHLENBQUMsQ0FBQTthQUNqRTtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkIsQ0FBQztRQUVNLE1BQU0sQ0FBQyxHQUFXO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQztLQUNKO0lBMUJELDZCQTBCQzs7Ozs7O0lDcEJELE1BQXFCLGNBQWUsU0FBUSxpQkFBZTtRQUt2RDtZQUNJLEtBQUssRUFBRSxDQUFBO1lBTEgsWUFBTyxHQUFHLENBQUMsQ0FBQztZQUNaLFNBQUksR0FBRyxFQUFFLENBQUM7WUFDVixlQUFVLEdBQUcsSUFBSSxvQkFBVSxFQUFFLENBQUM7UUFJdEMsQ0FBQztRQUVELElBQVcsTUFBTTtZQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDO1FBRU0sYUFBYSxDQUFDLFFBQWdCLEVBQUU7WUFDbkMsTUFBTSxLQUFLLEdBQUcsU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckUsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ3BELE1BQU0sUUFBUSxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUM3QixPQUFPO2dCQUNILEtBQUs7Z0JBQ0wsUUFBUTtnQkFDUixRQUFRO2FBQ1gsQ0FBQTtRQUNMLENBQUM7UUFFTSx3QkFBd0IsQ0FBQyxJQUE2QjtZQUN6RCxJQUFJLENBQUMsSUFBSSxJQUFJO0VBQ25CLElBQUksQ0FBQyxJQUFJOzs7Q0FHVixDQUFDO1FBQ0UsQ0FBQztRQUVNLG9CQUFvQixDQUFDLElBQXlCO1lBQ2pELElBQUksQ0FBQyxJQUFJLElBQUk7Ozs7O0NBS3BCLENBQUM7UUFDRSxDQUFDO1FBRU0sZ0JBQWdCLENBQUMsSUFBcUI7WUFDekMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9CLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLElBQUksSUFBSTtTQUNoQixJQUFJLENBQUMsSUFBSTtDQUNqQixDQUFBO2FBQ1E7aUJBQU07Z0JBQ0gsSUFBSSxDQUFDLElBQUksSUFBSTtrQkFDUCxJQUFJLENBQUMsSUFBSTtDQUMxQixDQUFDO2FBQ087UUFDTCxDQUFDO1FBRU0sc0JBQXNCLENBQUMsSUFBMkI7WUFDckQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxJQUFJLElBQUk7ZUFDTixNQUFNLFFBQVEsSUFBSSxDQUFDLElBQUk7Q0FDckMsQ0FBQztRQUNFLENBQUM7UUFFTSxlQUFlLENBQUMsSUFBb0I7WUFDdkMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxJQUFJLElBQUk7Y0FDUCxNQUFNLFdBQVcsSUFBSSxDQUFDLElBQUk7Q0FDdkMsQ0FBQTtRQUNHLENBQUM7UUFFTSxhQUFhLENBQUMsSUFBa0I7WUFDbkMsSUFBSSxHQUFHLEdBQUc7OztDQUdqQixDQUFDO1lBQ00sUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDeEIsS0FBSyxpQkFBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUMzQixHQUFHLElBQUksU0FBUyxDQUFBO29CQUNoQixHQUFHLElBQUksSUFBSSxDQUFDO29CQUNaLE1BQU07aUJBQ1Q7Z0JBQ0Qsa0ZBQWtGO2dCQUNsRixLQUFLLGlCQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3JCLEdBQUcsSUFBSSxjQUFjLENBQUM7b0JBQ3RCLEdBQUcsSUFBSSxXQUFXLENBQUM7b0JBQ25CLE1BQU07aUJBQ1Q7Z0JBQ0Qsa0ZBQWtGO2dCQUNsRixLQUFLLGlCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ25CLEdBQUcsSUFBSSxjQUFjLENBQUM7b0JBQ3RCLEdBQUcsSUFBSSxXQUFXLENBQUM7b0JBQ25CLEdBQUcsSUFBSSxjQUFjLENBQUM7b0JBQ3RCLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNyQixHQUFHLElBQUksY0FBYyxDQUFDO29CQUN0QixNQUFNO2lCQUNUO2dCQUNELEtBQUssaUJBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDckIsR0FBRyxJQUFJLGNBQWMsQ0FBQztvQkFDdEIsTUFBTTtpQkFDVDtnQkFDRCxLQUFLLGlCQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3hCLEdBQUcsSUFBSSxjQUFjLENBQUM7aUJBQ3pCO2dCQUNELEtBQUssaUJBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdkIsR0FBRyxJQUFJLGFBQWEsQ0FBQztpQkFDeEI7Z0JBQ0QsS0FBSyxpQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN4QixHQUFHLElBQUksY0FBYyxDQUFDO2lCQUN6QjtnQkFDRCxLQUFLLGlCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3ZCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7b0JBQy9DLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZDLEdBQUcsSUFBSTs7UUFFZixTQUFTOztRQUVULFFBQVE7RUFDZCxTQUFTOztFQUVULFFBQVE7Q0FDVCxDQUFDO29CQUNjLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNuQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMzQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QyxHQUFHLElBQUk7O09BRWhCLFNBQVM7O1FBRVIsUUFBUTtFQUNkLFNBQVM7O0VBRVQsUUFBUTtDQUNULENBQUM7b0JBQ2MsTUFBTTtpQkFDVDtnQkFDRCxLQUFLLGlCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzlDLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZDLEdBQUcsSUFBSTs7T0FFaEIsU0FBUzs7UUFFUixRQUFRO0VBQ2QsU0FBUzs7RUFFVCxRQUFRO0NBQ1QsQ0FBQztpQkFDVztnQkFDRCxLQUFLLGlCQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQzNCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDbkQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkMsR0FBRyxJQUFJOztRQUVmLFNBQVM7O1FBRVQsUUFBUTtFQUNkLFNBQVM7O0VBRVQsUUFBUTtDQUNULENBQUM7aUJBQ1c7Z0JBQ0QsS0FBSyxpQkFBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUNqRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QyxHQUFHLElBQUk7O09BRWhCLFNBQVM7O1FBRVIsUUFBUTtFQUNkLFNBQVM7O0VBRVQsUUFBUTtDQUNULENBQUM7aUJBQ1c7Z0JBQ0QsS0FBSyxpQkFBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQzlCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDdEQsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDekMsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkMsR0FBRyxJQUFJOztRQUVmLFNBQVM7O1FBRVQsUUFBUTtFQUNkLFNBQVM7O0VBRVQsUUFBUTtDQUNULENBQUM7aUJBQ1c7Z0JBQ0QsS0FBSyxpQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN2QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUMvQyxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QyxHQUFHLElBQUk7O1FBRWYsU0FBUzs7UUFFVCxRQUFRO0VBQ2QsU0FBUzs7RUFFVCxRQUFRO0NBQ1QsQ0FBQztpQkFDVztnQkFDRCxLQUFLLGlCQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2hELE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZDLEdBQUcsSUFBSTs7UUFFZixTQUFTOztRQUVULFNBQVM7O1FBRVQsUUFBUTtFQUNkLFNBQVM7O0VBRVQsUUFBUTtDQUNULENBQUM7b0JBQ2MsTUFBTTtpQkFDVDthQUNKO1lBQ0QsR0FBRyxJQUFJLFlBQVksQ0FBQTtZQUNuQixJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQztRQUNyQixDQUFDO1FBRU0sWUFBWSxDQUFDLElBQWlCO1lBQ2pDLElBQUksR0FBRyxHQUFHOztDQUVqQixDQUFBO1lBQ08sUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDeEIsS0FBSyxpQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNoRCxNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN6QyxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QyxHQUFHLElBQUk7O09BRWhCLFNBQVM7O1FBRVIsUUFBUTtFQUNkLFNBQVM7O0VBRVQsUUFBUTs7Q0FFVCxDQUFDO29CQUNjLE1BQU07aUJBQ1Q7Z0JBQ0QsS0FBSyxpQkFBUyxDQUFDLFdBQVc7b0JBQ3RCLEdBQUcsSUFBSTs7Q0FFdEIsQ0FBQztvQkFDVSxNQUFNO2dCQUNOLEtBQUssaUJBQVMsQ0FBQyxRQUFRO29CQUNuQixHQUFHLElBQUk7O0NBRXRCLENBQUM7b0JBQ2MsTUFBTTthQUNiO1lBQ0QsR0FBRyxJQUFJLFlBQVksQ0FBQztZQUNwQixJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQztRQUNyQixDQUFDO1FBRU0sb0JBQW9CLENBQUMsSUFBeUI7WUFDakQsSUFBSSxDQUFDLElBQUksSUFBSTtTQUNaLElBQUksQ0FBQyxLQUFLO0NBQ2xCLENBQUM7UUFDRSxDQUFDO0tBQ0o7SUFoUkQsaUNBZ1JDOzs7Ozs7SUNyUkQsU0FBd0IsUUFBUSxDQUFDLEdBQVU7UUFDdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSx3QkFBTyxFQUFFLENBQUM7UUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDMUIsQ0FBQztJQUpELDJCQUlDOzs7Ozs7OztJQ0FHLG1CQVBHLGtCQUFRLENBT0g7SUFGUix5QkFKRyx3QkFBYyxDQUlIOzs7OztJQ0xsQixNQUFNLFFBQVEsR0FBRztRQUNiLEtBQUs7UUFDTCxRQUFRO1FBQ1IsSUFBSTtRQUNKLE1BQU07S0FDVCxDQUFDO0lBRUYsa0JBQWUsUUFBUSxDQUFDOzs7Ozs7SUNKeEIsTUFBTSxFQUFFLEdBQUc7UUFDUCxPQUFPLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUc7UUFDNUMsS0FBSyxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hELEdBQUcsRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLFVBQVUsRUFBRSxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUMvRCxlQUFlLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUM3RixPQUFPLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLGtCQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1QyxLQUFLLEVBQUUsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUc7UUFDMUMsYUFBYSxFQUFFLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRztLQUNqRixDQUFDO0lBRUYsa0JBQWUsRUFBRSxDQUFDOzs7OztJQ1psQixNQUFxQixZQUFZO1FBOEI3Qjs7O1dBR0c7UUFDSCxZQUE0QixLQUFhO1lBQWIsVUFBSyxHQUFMLEtBQUssQ0FBUTtZQVR6Qzs7ZUFFRztZQUNLLFlBQU8sR0FBRyxDQUFDLENBQUM7UUFNd0IsQ0FBQztRQWpDN0MsSUFBWSxNQUFNO1lBQ2QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3hCLENBQUM7UUFFRDs7Ozs7V0FLRztRQUNILElBQVksTUFBTSxDQUFDLEtBQWE7WUFDNUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDeEMsTUFBTSxJQUFJLDZCQUFxQixFQUFFLENBQUM7YUFDckM7WUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDO1FBRUQ7O1dBRUc7UUFDSCxJQUFXLEdBQUc7WUFDVixPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDN0MsQ0FBQztRQWFEOzs7OztXQUtHO1FBQ0ksSUFBSSxDQUFDLFNBQWlCLENBQUMsRUFBRSxVQUFtQixLQUFLO1lBQ3BELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM5QjtZQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdEQsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7O1dBSUc7UUFDSSxJQUFJLENBQUMsU0FBaUIsQ0FBQyxFQUFFLFVBQW1CLEtBQUs7WUFDcEQsSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDVixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzlCO1lBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztZQUN0QixPQUFPLE1BQU0sQ0FBQztRQUNsQixDQUFDO1FBRUQ7OztXQUdHO1FBQ0ksS0FBSyxDQUFDLFNBQWlEO1lBQzFELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUNoQixPQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDYixJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRTtvQkFDakMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDekI7cUJBQU07b0JBQ0gsTUFBTTtpQkFDVDthQUNKO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDbEIsQ0FBQztRQUVEOzs7V0FHRztRQUNLLGFBQWEsQ0FBQyxNQUFjO1lBQ2hDLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7Z0JBQzFDLE1BQU0sS0FBSyxHQUFHLElBQUksZ0JBQVEsQ0FBQyxzQkFBc0IsTUFBTSwwQkFBMEIsQ0FBQyxDQUFDO2dCQUNuRixNQUFNLEtBQUssQ0FBQzthQUNmO1FBQ0wsQ0FBQztLQUNKO0lBM0ZELCtCQTJGQzs7Ozs7OztJQzFGRyx1QkFIRyxzQkFBWSxDQUdIOzs7Ozs7SUNJaEIsU0FBd0IsR0FBRyxDQUFDLEtBQTRCLEVBQUUsUUFBaUI7UUFDdkUsTUFBTSxNQUFNLEdBQWlCLENBQUMsQ0FBQyxLQUFLLFlBQVksMkJBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLDJCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVoRyxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDNUIsTUFBTSxJQUFJLEdBQUc7WUFDVCxJQUFJLEVBQUUsUUFBUSxJQUFJLGFBQWE7WUFDL0IsSUFBSSxFQUFFLENBQUM7WUFDUCxHQUFHLEVBQUUsQ0FBQztTQUNULENBQUM7UUFFRixxQ0FBcUM7UUFDckMsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUEsQ0FBQSxDQUFDLENBQUM7UUFDdkQsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLEdBQUcsSUFBSTtZQUFFLE9BQU8sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQUU7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUFFLElBQUksQ0FBQyxZQUFZLGdCQUFRO2dCQUFFLE9BQU8sRUFBRSxDQUFDO1lBQUMsTUFBTSxDQUFDLENBQUM7U0FBRSxDQUFBLENBQUMsQ0FBQztRQUVqSCxNQUFNLEVBQUUsT0FBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDdkIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFlLEVBQUUsTUFBYyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksYUFBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuSixNQUFNLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQztZQUV6QixvQkFBb0I7WUFDcEIsUUFBUSxTQUFTLEVBQUU7Z0JBQ2YsS0FBSyxJQUFJO29CQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDWixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFDakIsS0FBSyxJQUFJLENBQUM7Z0JBQ04saUNBQWlDO2dCQUNyQyxLQUFLLElBQUksQ0FBQztnQkFDVixLQUFLLElBQUksQ0FBQztnQkFDVixLQUFLLEdBQUc7b0JBQ0osU0FBUyxNQUFNLENBQUM7YUFDdkI7WUFFRCx5QkFBeUI7WUFDekIsUUFBUSxTQUFTLEVBQUU7Z0JBQ2YsS0FBSyxHQUFHO29CQUNKLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDN0MsU0FBUyxNQUFNLENBQUM7Z0JBQ3BCLEtBQUssR0FBRztvQkFDSixXQUFXLENBQUMsaUJBQVMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzlDLFNBQVMsTUFBTSxDQUFDO2dCQUNwQixLQUFLLEdBQUc7b0JBQ0osV0FBVyxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM3QyxTQUFTLE1BQU0sQ0FBQztnQkFDcEIsS0FBSyxHQUFHO29CQUNKLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDOUMsU0FBUyxNQUFNLENBQUM7Z0JBQ3BCLEtBQUssR0FBRztvQkFDSixXQUFXLENBQUMsaUJBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ3hDLFNBQVMsTUFBTSxDQUFDO2dCQUNwQixLQUFLLEdBQUc7b0JBQ0osV0FBVyxDQUFDLGlCQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUM3QyxTQUFTLE1BQU0sQ0FBQztnQkFDcEIsS0FBSyxHQUFHO29CQUNKLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDOUMsU0FBUyxNQUFNLENBQUM7Z0JBQ3BCLEtBQUssR0FBRztvQkFDSixXQUFXLENBQUMsaUJBQVMsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzlDLFNBQVMsTUFBTSxDQUFDO2dCQUNwQixLQUFLLEdBQUc7b0JBQ0osV0FBVyxDQUFDLGlCQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUN6QyxTQUFTLE1BQU0sQ0FBQztnQkFDcEIsS0FBSyxHQUFHO29CQUNKLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDeEMsU0FBUyxNQUFNLENBQUM7Z0JBQ3BCLEtBQUssR0FBRztvQkFDSixXQUFXLENBQUMsaUJBQVMsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQ2hELFNBQVMsTUFBTSxDQUFDO2FBQ3ZCO1lBRUQsOEJBQThCO1lBQzlCLFFBQVEsU0FBUyxFQUFFO2dCQUNmLEtBQUssR0FBRztvQkFDSixRQUFRLElBQUksRUFBRSxFQUFFO3dCQUNaLEtBQUssR0FBRzs0QkFDSixXQUFXLENBQUMsaUJBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7NEJBQ2xELFNBQVMsTUFBTSxDQUFDO3dCQUNwQjs0QkFDSSxXQUFXLENBQUMsaUJBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7NEJBQ3pDLFNBQVMsTUFBTSxDQUFDO3FCQUN2QjtnQkFDTCxLQUFLLEdBQUc7b0JBQ0osV0FBVyxDQUFDLGlCQUFTLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUMzQyxTQUFTLE1BQU0sQ0FBQztnQkFDcEIsS0FBSyxHQUFHO29CQUNKLFFBQU8sSUFBSSxFQUFFLEVBQUU7d0JBQ1gsS0FBSyxHQUFHOzRCQUNKLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLFVBQVUsRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDdEQsU0FBUyxNQUFNLENBQUM7d0JBQ3BCOzRCQUNJLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQzs0QkFDOUMsU0FBUyxNQUFNLENBQUM7cUJBQ3ZCO2dCQUNMLEtBQUssR0FBRztvQkFDSixXQUFXLENBQUMsaUJBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzNDLFNBQVMsTUFBTSxDQUFDO2dCQUNwQixLQUFLLEdBQUc7b0JBQ0osV0FBVyxDQUFDLGlCQUFTLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO29CQUNqRCxTQUFTLE1BQU0sQ0FBQztnQkFDcEIsS0FBSyxHQUFHO29CQUNKLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztvQkFDM0MsU0FBUyxNQUFNLENBQUM7Z0JBQ3BCLEtBQUssR0FBRztvQkFDSixRQUFRLElBQUksRUFBRSxFQUFFO3dCQUNaLEtBQUssR0FBRzs0QkFDSixXQUFXLENBQUMsaUJBQVMsQ0FBQyxVQUFVLEVBQUUsU0FBUyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7NEJBQ3RELFNBQVMsTUFBTSxDQUFDO3dCQUNwQjs0QkFDSSxXQUFXLENBQUMsaUJBQVMsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7NEJBQzdDLFNBQVMsTUFBTSxDQUFDO3FCQUN2QjtnQkFDTCxLQUFLLEdBQUc7b0JBQ0osUUFBTyxJQUFJLEVBQUUsRUFBRTt3QkFDWCxLQUFLLEdBQUc7NEJBQ0osV0FBVyxDQUFDLGlCQUFTLENBQUMsV0FBVyxFQUFFLFNBQVMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDOzRCQUN2RCxTQUFTLE1BQU0sQ0FBQzt3QkFDcEI7NEJBQ0ksV0FBVyxDQUFDLGlCQUFTLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDOzRCQUM5QyxTQUFTLE1BQU0sQ0FBQztxQkFDdkI7Z0JBQ0wsS0FBSyxHQUFHO29CQUNKLFFBQU8sSUFBSSxFQUFFLEVBQUU7d0JBQ1gsS0FBSyxHQUFHOzRCQUNKLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLGNBQWMsRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDMUQsU0FBUyxNQUFNLENBQUM7d0JBQ3BCOzRCQUNJLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQzs0QkFDNUMsU0FBUyxNQUFNLENBQUM7cUJBQ3ZCO2dCQUNMLEtBQUssR0FBRztvQkFDSixRQUFPLElBQUksRUFBRSxFQUFFO3dCQUNYLEtBQUssR0FBRzs0QkFDSixXQUFXLENBQUMsaUJBQVMsQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQzs0QkFDN0QsU0FBUyxNQUFNLENBQUM7d0JBQ3BCOzRCQUNJLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQzs0QkFDL0MsU0FBUyxNQUFNLENBQUM7cUJBQ3ZCO2FBQ1I7WUFFRCw2RUFBNkU7WUFDN0UsNEVBQTRFO1lBQzVFLDRDQUE0QztZQUM1QyxVQUFVO1lBQ1YsSUFBSSxZQUFFLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUN2QixNQUFNLE9BQU8sR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25ELElBQUksSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFFO29CQUNoQixNQUFNLEdBQUcsR0FBRyxJQUFJLEVBQUUsQ0FBQztvQkFDbkIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3JDLFdBQVcsQ0FBQyxpQkFBUyxDQUFDLGFBQWEsRUFBRSxPQUFPLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO2lCQUMvRDtxQkFBTTtvQkFDSCxXQUFXLENBQUMsaUJBQVMsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ25EO2dCQUNELFNBQVMsTUFBTSxDQUFDO2FBQ25CO1lBRUQsbUNBQW1DO1lBQ25DLElBQUksU0FBUyxLQUFLLEdBQUcsRUFBRTtnQkFDbkIsTUFBTSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUM7Z0JBQ3BCLGNBQWM7Z0JBQ2QsSUFBSSxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7b0JBQzlCLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO29CQUNqQixXQUFXLENBQUMsaUJBQVMsQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNoRjtnQkFDRCxRQUFRO3FCQUNIO29CQUNELFdBQVcsQ0FBQyxpQkFBUyxDQUFDLGVBQWUsRUFBRSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDOUU7Z0JBQ0QsU0FBUyxNQUFNLENBQUM7YUFDbkI7WUFFRCwyQkFBMkI7WUFDM0IsSUFBSSxZQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxFQUFFO2dCQUMvQixNQUFNLE1BQU0sR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZELE1BQU0sSUFBSSxHQUFHLENBQUMsWUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsaUJBQVMsQ0FBQyxVQUFVLENBQUM7Z0JBQzdFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzFCLFNBQVMsTUFBTSxDQUFDO2FBQ25CO1lBRUQsV0FBVyxDQUFDLGlCQUFTLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQzVDO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQXJMRCxzQkFxTEM7SUFBQSxDQUFDOzs7Ozs7Ozs7SUN0TEUsYUFORyxZQUFFLENBTUg7SUFDRixtQkFORyxrQkFBUSxDQU1IO0lBRlIsY0FIRyxhQUFHLENBR0g7Ozs7O0lDRFAsTUFBcUIsZ0JBQWlCLFNBQVEsaUJBQWM7UUFVeEQ7WUFDSSxLQUFLLEVBQUUsQ0FBQztRQUNaLENBQUM7UUFURCxJQUFXLE1BQU07WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDWCxNQUFNLElBQUksU0FBUyxDQUFDLHlCQUF5QixDQUFDLENBQUM7YUFDbEQ7WUFDRCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsQ0FBQztRQU1NLEtBQUssQ0FBQyxJQUFXO1lBQ3BCLHVFQUF1RTtZQUN2RSx5Q0FBeUM7WUFDekMsa0NBQWtDO1lBQ2xDLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNyQixNQUFNLEdBQUcsR0FBSSxJQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxDQUFDLEdBQUcsWUFBWSxVQUFJLENBQUMsRUFBRTtvQkFDeEIsU0FBUztpQkFDWjtnQkFFRCxJQUFJLEdBQUcsWUFBWSxjQUFRLEVBQUU7b0JBQ3hCLElBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3BEO3FCQUFNLElBQUksR0FBRyxZQUFZLGFBQU8sRUFBRTtvQkFDOUIsSUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ25EO2FBQ0o7WUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztZQUNoQixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLENBQUM7UUFFTSxlQUFlLENBQUMsSUFBYTtZQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsWUFBWSxxQkFBZSxDQUFDLEVBQUU7Z0JBQzlDLFFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQ3ZCLEtBQUssaUJBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFFLElBQUksQ0FBQyxVQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUM1RCxPQUFPLElBQUkscUJBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDckM7b0JBQ0QsS0FBSyxpQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUN4QixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUUsSUFBSSxDQUFDLFVBQThCLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzVELE9BQU8sSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCxLQUFLLGlCQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3hCLE1BQU0sS0FBSyxHQUFHLENBQUUsSUFBSSxDQUFDLFVBQThCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNuRSxPQUFPLElBQUkscUJBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDckM7aUJBQ0o7YUFDSjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFTSxnQkFBZ0IsQ0FBQyxJQUFjO1lBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLHFCQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVkscUJBQWUsQ0FBQyxFQUFFO2dCQUNuRixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUN4QixLQUFLLGlCQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3JCLE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxJQUF3QixDQUFDLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBeUIsQ0FBQyxLQUFLLENBQUM7d0JBQzNGLE9BQU8sSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCxLQUFLLGlCQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3JCLE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxJQUF3QixDQUFDLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBeUIsQ0FBQyxLQUFLLENBQUM7d0JBQzNGLE9BQU8sSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCxLQUFLLGlCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3RCLE1BQU0sS0FBSyxHQUFHLENBQUUsSUFBSSxDQUFDLElBQXdCLENBQUMsS0FBSyxHQUFJLElBQUksQ0FBQyxLQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckcsT0FBTyxJQUFJLHFCQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3JDO29CQUNELEtBQUssaUJBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQzt3QkFDM0IsTUFBTSxLQUFLLEdBQUcsQ0FBRSxJQUFJLENBQUMsSUFBd0IsQ0FBQyxLQUFLLElBQUssSUFBSSxDQUFDLEtBQXlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0RyxPQUFPLElBQUkscUJBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDckM7b0JBQ0QsS0FBSyxpQkFBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUN6QixNQUFNLEtBQUssR0FBRyxDQUFFLElBQUksQ0FBQyxJQUF3QixDQUFDLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3JHLE9BQU8sSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCxLQUFLLGlCQUFTLENBQUMsaUJBQWlCLENBQUMsQ0FBQzt3QkFDOUIsTUFBTSxLQUFLLEdBQUcsQ0FBRSxJQUFJLENBQUMsSUFBd0IsQ0FBQyxLQUFLLElBQUssSUFBSSxDQUFDLEtBQXlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0RyxPQUFPLElBQUkscUJBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDckM7b0JBQ0QsNENBQTRDO29CQUM1QyxLQUFLLGlCQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7d0JBQzNCLE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxJQUF3QixDQUFDLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBeUIsQ0FBQyxLQUFLLENBQUM7d0JBQzNGLE9BQU8sSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCxrQ0FBa0M7b0JBQ2xDLEtBQUssaUJBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDckIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBRSxJQUFJLENBQUMsSUFBd0IsQ0FBQyxLQUFLLEdBQUksSUFBSSxDQUFDLEtBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZHLE9BQU8sSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQztvQkFDRCxLQUFLLGlCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ25CLE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxJQUF3QixDQUFDLEtBQUssR0FBSSxJQUFJLENBQUMsS0FBeUIsQ0FBQyxLQUFLLENBQUM7d0JBQzNGLE9BQU8sSUFBSSxxQkFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNyQztvQkFFRCxLQUFLLGlCQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ25CLE1BQU0sS0FBSyxHQUFJLElBQUksQ0FBQyxJQUF3QixDQUFDLEtBQUssS0FBTSxJQUFJLENBQUMsS0FBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNyRyxPQUFPLElBQUkscUJBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDckM7b0JBQ0QsS0FBSyxpQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUN2QixNQUFNLEtBQUssR0FBSSxJQUFJLENBQUMsSUFBd0IsQ0FBQyxLQUFLLEtBQU0sSUFBSSxDQUFDLEtBQXlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckcsT0FBTyxJQUFJLHFCQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3JDO2lCQUNKO2FBQ0o7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0tBQ0o7SUE1R0QsbUNBNEdDOzs7Ozs7SUM3R0QsU0FBd0IsUUFBUSxDQUFDLEdBQVU7UUFDdkMsTUFBTSxPQUFPLEdBQUcsSUFBSSwwQkFBTyxFQUFFLENBQUM7UUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQixPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFKRCwyQkFJQzs7Ozs7Ozs7SUNIRyxtQkFKRyxrQkFBUSxDQUlIO0lBQ1IsMkJBSkcsMEJBQWdCLENBSUg7Ozs7Ozs7OztJRUpwQixNQUFNLE9BQU8sR0FBRztRQUNaLFFBQVEsRUFBRSxLQUFLO0tBQ2xCLENBQUM7SUFFRixrQkFBZSxPQUFPLENBQUE7Ozs7Ozs7SUNBbEIseUJBSkcsaUJBQWMsQ0FJSDs7Ozs7O0lDQ2xCLFNBQXdCLFdBQVcsQ0FDL0IsTUFBbUI7UUFFbkIsSUFBSSxVQUFVLENBQUM7UUFDZixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFM0IsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFTLENBQUMsVUFBVSxFQUFFO1lBQ3BDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVkLHdEQUF3RDtZQUN4RCxJQUFJLFNBQVMsSUFBSSx5QkFBZSxFQUFFO2dCQUM5QixhQUFhO2dCQUNiLHlCQUFlLEdBQUcseUJBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNoRDtZQUVELFVBQVUsR0FBRyx5QkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4QzthQUFNLElBQUksSUFBSSxDQUFDLElBQUksR0FBRyxpQkFBUyxDQUFDLFFBQVEsRUFBRTtZQUN2QyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0IsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBRSxDQUFDO1lBQ3BDLFVBQVUsR0FBRyxJQUFJLGFBQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzNFO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLGlCQUFTLENBQUMsVUFBVSxFQUFFO1lBQzNDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMzQixVQUFVLEdBQUcsSUFBSSx1QkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1NBQzNFO2FBQU07WUFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFTLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDMUQsVUFBVSxHQUFHLElBQUkscUJBQWUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNuRztRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUE3QkQsOEJBNkJDO0lBQUEsQ0FBQzs7Ozs7O0lDN0JGLFNBQXdCLFNBQVMsQ0FDN0IsTUFBbUI7UUFFbkIsSUFBSSxNQUFNLEdBQUcscUJBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsaUJBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDeEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLE1BQU0sS0FBSyxHQUFHLHFCQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbEMsTUFBTSxHQUFHLElBQUksY0FBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNuRjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFWRCw0QkFVQztJQUFBLENBQUM7Ozs7OztJQ1prQyxDQUFDO0lBRXJDLFNBQXdCLGFBQWEsQ0FDakMsTUFBbUI7UUFFbkIsSUFBSSxVQUFVLEdBQUcsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsaUJBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDNUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLE1BQU0sS0FBSyxHQUFHLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEMsVUFBVSxHQUFHLElBQUksY0FBUSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMvRjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFWRCxnQ0FVQztJQUFBLENBQUM7Ozs7OztJQ1owQyxDQUFDO0lBRTdDLFNBQXdCLGNBQWMsQ0FDbEMsTUFBbUI7UUFFbkIsSUFBSSxVQUFVLEdBQUcsdUJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsa0JBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDOUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLE1BQU0sS0FBSyxHQUFHLHVCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsVUFBVSxHQUFHLElBQUksY0FBUSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMvRjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFWRCxpQ0FVQztJQUFBLENBQUM7Ozs7OztJQ1o4QyxDQUFDO0lBRWpELFNBQXdCLGFBQWEsQ0FDakMsTUFBbUI7UUFFbkIsSUFBSSxVQUFVLEdBQUcseUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsa0JBQVMsQ0FBQyxRQUFRLEVBQUU7WUFDNUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLE1BQU0sS0FBSyxHQUFHLHlCQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsVUFBVSxHQUFHLElBQUksY0FBUSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMvRjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFWRCxnQ0FVQztJQUFBLENBQUM7Ozs7OztJQ1owQyxDQUFDO0lBRTdDLFNBQXdCLGNBQWMsQ0FDbEMsTUFBbUI7UUFFbkIsSUFBSSxVQUFVLEdBQUcsdUJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsa0JBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDL0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLE1BQU0sS0FBSyxHQUFHLHVCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEMsVUFBVSxHQUFHLElBQUksY0FBUSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMvRjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFWRCxpQ0FVQztJQUFBLENBQUM7Ozs7OztJQ1o4QyxDQUFDO0lBRWpELFNBQXdCLGNBQWMsQ0FDbEMsTUFBbUI7UUFFbkIsSUFBSSxVQUFVLEdBQUcseUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxPQUFPLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEdBQUcsa0JBQVMsQ0FBQyxVQUFVLEVBQUU7WUFDOUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLE1BQU0sS0FBSyxHQUFHLHlCQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsVUFBVSxHQUFHLElBQUksY0FBUSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUMvRjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFWRCxpQ0FVQztJQUFBLENBQUM7Ozs7OztJQ2I0QyxDQUFDO0lBRy9DLFNBQXdCLGVBQWUsQ0FDbkMsTUFBbUI7UUFFbkIsSUFBSSxVQUFVLENBQUM7UUFDZixJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssa0JBQVMsQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssa0JBQVMsQ0FBQyxNQUFNLEVBQUU7WUFDekYsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNoQyxNQUFNLEtBQUssR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEMsVUFBVSxHQUFHLElBQUksZ0JBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUM1RTthQUFNO1lBQ0gsVUFBVSxHQUFHLHdCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7UUFDRCxPQUFPLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBYkQsa0NBYUM7SUFBQSxDQUFDOzs7Ozs7SUNiRixTQUF3QixjQUFjLENBQ2xDLE1BQW1CO1FBRW5CLHNEQUFzRDtRQUN0RCxJQUFJLFNBQVMsR0FBYyxJQUFJLGdCQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxjQUFLLENBQUMsa0JBQVMsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssa0JBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDakMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtnQkFDdkIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUMzQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2pELElBQUksVUFBVSxDQUFDO2dCQUNmLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxrQkFBUyxDQUFDLFVBQVUsRUFBRTtvQkFDN0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoQyxVQUFVLEdBQUcseUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0QsU0FBUyxHQUFHLElBQUksa0JBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUNqRjtpQkFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUNqQyxtQkFBbUI7Z0JBQ25CLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZCxNQUFNLFVBQVUsR0FBRyx5QkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQyxTQUFTLEdBQUcsSUFBSSxzQkFBZSxDQUFDLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQzthQUN4RTtpQkFBTTtnQkFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO2FBQ2hEO1NBQ0o7YUFBTTtZQUNILFNBQVMsR0FBRyx5QkFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUE3QkQsaUNBNkJDO0lBQUEsQ0FBQzs7Ozs7O0lDN0JGLFNBQXdCLHdCQUF3QixDQUM1QyxNQUFtQjtRQUVuQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFTLENBQUMsT0FBTyxHQUFHLGtCQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckUsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwQyx1QkFBdUI7UUFDdkIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxrQkFBUyxDQUFDLFdBQVcsRUFBRTtZQUNoRSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakI7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRXBDLE1BQU0sVUFBVSxHQUFnQixFQUFFLENBQUM7UUFDbkMsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxLQUFLLGtCQUFTLENBQUMsV0FBVyxFQUFFO1lBQ2pELE1BQU0sU0FBUyxHQUFHLHdCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5QjtRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsa0JBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNyQyxPQUFPLElBQUksMEJBQW1CLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN4RyxDQUFDO0lBcEJELDJDQW9CQztJQUFBLENBQUM7Ozs7OztJQ3JCRixTQUF3QixZQUFZLENBQ2hDLE1BQW1CO1FBRW5CLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUNoQixTQUFTLENBQUMsSUFBSSxDQUNWLGtDQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUNuQyxDQUFDO1NBQ0w7UUFDRCxPQUFPLElBQUksY0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM1RixDQUFDO0lBVkQsK0JBVUM7SUFBQSxDQUFDOzs7Ozs7SUNURixTQUF3QixLQUFLLENBQUMsTUFBOEI7UUFDeEQsTUFBTSxHQUFHLENBQUMsQ0FBQyxNQUFNLFlBQVkseUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLHlCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUM3RSxPQUFPLHNCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUhELHdCQUdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUN1QkcsZ0JBaENHLGVBQUssQ0FnQ0g7SUFFTCx1QkFsQkcsc0JBQVksQ0FrQkg7SUFDWixtQ0FsQkcsa0NBQXdCLENBa0JIO0lBQ3hCLHlCQWxCRyx3QkFBYyxDQWtCSDtJQUVkLDBCQWxCRyx5QkFBZSxDQWtCSDtJQUNmLHlCQWxCRyx3QkFBYyxDQWtCSDtJQUNkLDBCQWxCRyx5QkFBZSxDQWtCSDtJQUNmLHdCQWxCRyx1QkFBYSxDQWtCSDtJQUNiLDBCQWxCRyx5QkFBZSxDQWtCSDtJQUNmLHdCQWxCRyx1QkFBYSxDQWtCSDtJQUViLG9CQWxCRyxtQkFBUyxDQWtCSDtJQUNULHNCQWxCRyxxQkFBVyxDQWtCSCIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCBiaXQgPSAobjogbnVtYmVyKSA9PiAyICoqIG47XHJcblxyXG5lbnVtIFRva2VuVHlwZSB7XHJcbiAgICBFT0YgPSAwLFxyXG4gICAgVU5LT1dOID0gYml0KDApLFxyXG5cclxuICAgIExFRlRfQlJBQ0UgPSBiaXQoMSksIC8vIHtcclxuICAgIFJJR0hUX0JSQUNFID0gYml0KDIpLCAvLyB9XHJcbiAgICBMRUZUX1BBUkVOID0gYml0KDMpLCAvLyAoXHJcbiAgICBSSUdIVF9QQVJFTiA9IGJpdCg0KSwgLy8gKVxyXG5cclxuICAgIENPTU1BID0gYml0KDUpLCAvLyAsXHJcbiAgICBTRU1JX0NPTE9OID0gYml0KDYpLCAvLyA7XHJcbiAgICBDT0xPTiA9IGJpdCg3KSwgLy8gOlxyXG4gICAgUVVFU1RJT05fTUFSSyA9IGJpdCg4KSwgLy8gP1xyXG5cclxuICAgIE5FR0FUSU9OID0gYml0KDkpLCAvLyAtXHJcbiAgICBBRERJVElPTiA9IGJpdCgxMCksIC8vICtcclxuICAgIE1VTFRJUExJQ0FUSU9OID0gYml0KDExKSwgLy8gKlxyXG4gICAgRElWSVNJT04gPSBiaXQoMTIpLCAvLyAvXHJcbiAgICBNT0RVTE8gPSBiaXQoMTMpLCAvLyAlXHJcblxyXG4gICAgQklUV0lTRV9OT1QgPSBiaXQoMTQpLCAvLyB+XHJcbiAgICBCSVRXSVNFX09SID0gYml0KDE1KSwgLy8gfFxyXG4gICAgQklUV0lTRV9BTkQgPSBiaXQoMTYpLCAvLyAmXHJcbiAgICBCSVRXSVNFX1hPUiA9IGJpdCgxNyksIC8vIF5cclxuXHJcbiAgICBMT0dJQ0FMX05PVCA9IGJpdCgxOCksIC8vICFcclxuICAgIExPR0lDQUxfQU5EID0gYml0KDE5KSwgLy8gJiZcclxuICAgIExPR0lDQUxfT1IgPSBiaXQoMjApLCAgLy8gfHxcclxuICAgIFxyXG4gICAgQVNTSUdOID0gYml0KDIxKSwgLy8gPVxyXG4gICAgRVFVQUxTID0gYml0KDIyKSwgLy8gPT1cclxuICAgIE5PVF9FUVVBTFMgPSBiaXQoMjMpLCAvLyAhPVxyXG5cclxuICAgIExFU1NfVEhBTiA9IGJpdCgyNCksIC8vIDxcclxuICAgIExFU1NfT1JfRVFVQUxTID0gYml0KDI1KSwgLy8gPD1cclxuICAgIEdSRUFURVJfVEhBTiA9IGJpdCgyNiksIC8vID5cclxuICAgIEdSRUFURVJfT1JfRVFVQUxTID0gYml0KDI3KSwgLy8gPj1cclxuXHJcbiAgICBLRVlXT1JEID0gYml0KDI4KSxcclxuICAgIElERU5USUZJRVIgPSBiaXQoMjkpLCAvLyAvW2Etel9dW2EtejAtOV9dKi9pXHJcblxyXG4gICAgSU5URUdFUl9MSVRFUkFMID0gYml0KDMwKSwgLy8gL1sxLTldWzAtOV0qL1xyXG4gICAgRkxPQVRfTElURVJBTCA9IGJpdCgzMSksICAvLyAvWzEtOV1bMC05XSpbLl1bMC05XSovXHJcblxyXG4gICAgLy8gaGVscGVyIHR5cGVzIC0gcmVwcmVzZW50cyBtdWx0aXBsZSB0eXBlc1xyXG4gICAgVU5BUllfT1AgPSBUb2tlblR5cGUuQklUV0lTRV9OT1QgfCBUb2tlblR5cGUuTkVHQVRJT04gfCBUb2tlblR5cGUuTE9HSUNBTF9OT1QsXHJcbiAgICBBRERJVElWRSA9IFRva2VuVHlwZS5ORUdBVElPTiB8IFRva2VuVHlwZS5BRERJVElPTixcclxuICAgIFRFUk0gPSBUb2tlblR5cGUuTVVMVElQTElDQVRJT04gfCBUb2tlblR5cGUuRElWSVNJT04gfCBUb2tlblR5cGUuTU9EVUxPLFxyXG4gICAgUkVMQVRJT05BTCA9IFRva2VuVHlwZS5MRVNTX1RIQU4gfCBUb2tlblR5cGUuTEVTU19PUl9FUVVBTFMgfCBUb2tlblR5cGUuR1JFQVRFUl9USEFOIHwgVG9rZW5UeXBlLkdSRUFURVJfT1JfRVFVQUxTLFxyXG4gICAgRVFVQUxJVFkgPSBUb2tlblR5cGUuRVFVQUxTIHwgVG9rZW5UeXBlLk5PVF9FUVVBTFMsXHJcbiAgICBCSU5BUllfT1AgPSBUb2tlblR5cGUuVEVSTSB8IFRva2VuVHlwZS5BRERJVElWRSB8IFRva2VuVHlwZS5SRUxBVElPTkFMIHwgVG9rZW5UeXBlLkVRVUFMSVRZLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG9rZW5UeXBlO1xyXG4iLCJpbXBvcnQgVG9rZW5UeXBlIGZyb20gJy4vVG9rZW5UeXBlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBJVG9rZW4ge1xyXG4gICAgbGV4ZW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBUb2tlblR5cGU7XHJcbiAgICBmaWxlOiBzdHJpbmc7XHJcbiAgICBsaW5lOiBudW1iZXI7XHJcbiAgICBjb2w6IG51bWJlcjtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgSUZpbGVJbmZvIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGxpbmU6IG51bWJlcjtcclxuICAgIGNvbDogbnVtYmVyO1xyXG59IiwiaW1wb3J0IElGaWxlSW5mbyBmcm9tICcuL0lGaWxlSW5mbyc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgSUZpbGVJbmZvXHJcbn1cclxuIiwiaW1wb3J0IHsgSUZpbGVJbmZvIH0gZnJvbSAnLi4vRmlsZUluZm8nO1xyXG5pbXBvcnQgSVRva2VuIGZyb20gJy4vSVRva2VuJztcclxuaW1wb3J0IFRva2VuVHlwZSBmcm9tICcuL1Rva2VuVHlwZSc7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW48VCBleHRlbmRzIFRva2VuVHlwZT4gaW1wbGVtZW50cyBJVG9rZW4ge1xyXG4gICAgcHVibGljIHJlYWRvbmx5IGZpbGU6IHN0cmluZztcclxuICAgIHB1YmxpYyByZWFkb25seSBjb2w6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWFkb25seSBsaW5lOiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHR5cGU6IFQsIHB1YmxpYyByZWFkb25seSBsZXhlbWU6IHN0cmluZywgaW5mbzogSUZpbGVJbmZvID0geyBjb2w6IDAsIGxpbmU6IDAsIG5hbWU6ICdbdW5rbm93bl0nfSkge1xyXG4gICAgICAgIHRoaXMuZmlsZSA9IGluZm8ubmFtZTtcclxuICAgICAgICB0aGlzLmxpbmUgPSBpbmZvLmxpbmU7XHJcbiAgICAgICAgdGhpcy5jb2wgPSBpbmZvLmNvbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdG9KU09OKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGxleGVtZTogdGhpcy5sZXhlbWUsXHJcbiAgICAgICAgICAgIHR5cGU6IFRva2VuVHlwZVt0aGlzLnR5cGVdLFxyXG4gICAgICAgICAgICBmaWxlOiB0aGlzLmZpbGUsXHJcbiAgICAgICAgICAgIGxpbmU6IHRoaXMubGluZSxcclxuICAgICAgICAgICAgY29sOiB0aGlzLmNvbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgSVRva2VuIGZyb20gJy4vSVRva2VuJztcclxuaW1wb3J0IFRva2VuIGZyb20gJy4vVG9rZW4nO1xyXG5pbXBvcnQgVG9rZW5UeXBlIGZyb20gJy4vVG9rZW5UeXBlJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBJVG9rZW4sXHJcbiAgICBUb2tlbixcclxuICAgIFRva2VuVHlwZSxcclxufVxyXG4iLCJpbXBvcnQgeyBUb2tlblR5cGUgfSBmcm9tICcuLi9Ub2tlbic7XHJcblxyXG4vLyBiYXNlZCBvbiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxyXG5jb25zdCBUb2tlblR5cGVNYXggPSA1MjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNwbGl0VG9rZW5UeXBlcyh0eXBlOiBUb2tlblR5cGUpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgdHlwZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICBmb3IobGV0IGkgPSAwLCBiaXQgPSAwOyBpIDwgVG9rZW5UeXBlTWF4OyBpKyspIHtcclxuICAgICAgICBiaXQgPSAyICoqIGk7XHJcbiAgICAgICAgY29uc3QgdGVzdCA9IHR5cGUgJiBiaXQ7XHJcbiAgICAgICAgaWYgKHRlc3QpIHtcclxuICAgICAgICAgICAgdHlwZXMucHVzaChUb2tlblR5cGVbYml0XSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHR5cGVzLmpvaW4oJ3wnKTtcclxufVxyXG4iLCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGlsZXJFcnJvciBleHRlbmRzIEVycm9yIHt9XHJcbiIsImltcG9ydCBDb21waWxlckVycm9yIGZyb20gJy4vQ29tcGlsZXJFcnJvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFT0ZFcnJvciBleHRlbmRzIENvbXBpbGVyRXJyb3Ige31cclxuIiwiaW1wb3J0IENvbXBpbGVyRXJyb3IgZnJvbSAnLi9Db21waWxlckVycm9yJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4T3V0T2ZCb3VuZHNFcnJvciBleHRlbmRzIENvbXBpbGVyRXJyb3Ige31cclxuIiwiaW1wb3J0IENvbXBpbGVyRXJyb3IgZnJvbSAnLi9Db21waWxlckVycm9yJztcclxuaW1wb3J0IEVPRkVycm9yIGZyb20gJy4vRU9GRXJyb3InO1xyXG5pbXBvcnQgSW5kZXhPdXRPZkJvdW5kc0Vycm9yIGZyb20gJy4vSW5kZXhPdXRPZkJvdW5kc0Vycm9yJztcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBDb21waWxlckVycm9yLFxyXG4gICAgRU9GRXJyb3IsXHJcbiAgICBJbmRleE91dE9mQm91bmRzRXJyb3IsXHJcbn1cclxuIiwiaW1wb3J0IHsgQ29tcGlsZXJFcnJvciB9IGZyb20gJy4uL0Vycm9yJztcclxuaW1wb3J0IHsgSVRva2VuIH0gZnJvbSBcIi4uL1Rva2VuXCI7XHJcblxyXG5pbXBvcnQgVG9rZW5TdHJlYW0gZnJvbSBcIi4vVG9rZW5TdHJlYW1cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnNlRXJyb3IgZXh0ZW5kcyBDb21waWxlckVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgcHVibGljIGRldGFpbHM6IHN0cmluZywgcHVibGljIHRva2VuOiBJVG9rZW4sIHB1YmxpYyBzdHJlYW06IFRva2VuU3RyZWFtKSB7XHJcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZSArICdcXG4nICsgdGhpcy5kZXRhaWxzO1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgc3BsaXRUb2tlblR5cGVzIGZyb20gJy4vc3BsaXRUb2tlblR5cGVzJztcclxuXHJcbmltcG9ydCB7IElUb2tlbiwgVG9rZW4sIFRva2VuVHlwZSB9IGZyb20gJy4uL1Rva2VuJztcclxuaW1wb3J0IFBhcnNlRXJyb3IgZnJvbSAnLi9QYXJzZUVycm9yJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRva2VuU3RyZWFtIHtcclxuICAgIHByaXZhdGUgX2luZGV4ID0gMDtcclxuICAgIHJlYWRvbmx5IEVPRlRva2VuOiBJVG9rZW47XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgaW5kZXgoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0IGluZGV4KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9pbmRleCA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLl9pbmRleCA+IHRoaXMudG9rZW5zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbmRleCA9IHRoaXMudG9rZW5zLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSB0b2tlbnM6IElUb2tlbltdKSB7XHJcbiAgICAgICAgLy8gc25pZmYgZmlsZW5hbWUgaWYgcG9zc2libGVcclxuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHRva2Vuc1swXSAmJiB0b2tlbnNbMF0uZmlsZTtcclxuICAgICAgICAvLyBjcmVhdGUgYSBmYWtlIHRva2VuIHRvIHNpZ25hbCBFT0YgYnV0IHdpdGggYSB2YWxpZCBUb2tlbiBpbnN0YW5jZVxyXG4gICAgICAgIHRoaXMuRU9GVG9rZW4gPSBuZXcgVG9rZW4oVG9rZW5UeXBlLkVPRiwgJ1tlb2ZdJywge1xyXG4gICAgICAgICAgICBuYW1lOiBmaWxlbmFtZSB8fCAnW2VvZl0nLFxyXG4gICAgICAgICAgICBsaW5lOiAwLFxyXG4gICAgICAgICAgICBjb2w6IDBcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGVvZigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbmRleCA9PT0gdGhpcy50b2tlbnMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBwZWVrKG9mZnNldCA9IDApOiBJVG9rZW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRva2Vuc1t0aGlzLmluZGV4ICsgb2Zmc2V0XSB8fCB0aGlzLkVPRlRva2VuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZXh0KCk6IElUb2tlbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5zW3RoaXMuaW5kZXgrK10gfHwgdGhpcy5FT0ZUb2tlbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhwZWN0KHR5cGU6IFRva2VuVHlwZSwgbWVzc2FnZT86IHN0cmluZyk6IElUb2tlbiB7XHJcbiAgICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnBlZWsoKTtcclxuICAgICAgICBpZiAodG9rZW4udHlwZSAmIHR5cGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmV4dCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5wYW5pYyh0b2tlbiwgKG1lc3NhZ2UpID8gbWVzc2FnZSA6IHR5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHRocm93cyB7RXJyb3J9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwYW5pYyh0b2tlbjogSVRva2VuLCB0eXBlOiBzdHJpbmd8VG9rZW5UeXBlKTogbmV2ZXIge1xyXG4gICAgICAgIGNvbnN0IG1zZyA9ICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpID8gdHlwZSA6IHNwbGl0VG9rZW5UeXBlcyh0eXBlKTtcclxuICAgICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihgUGFyc2VFcnJvciBpbiAnJHt0b2tlbi5maWxlfScgYXQgJHt0b2tlbi5saW5lfToke3Rva2VuLmNvbH1gLCB0aGlzLmZyaWVuZGx5RXJyb3IodG9rZW4sIGBleHBlY3RlZCAnJHttc2d9JyBpbnN0ZWFkIGdvdCAnJHtUb2tlblR5cGVbdG9rZW4udHlwZV19JyBgKSwgdG9rZW4sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2VuZXJhdGUgYSB1c2VyIGZyaWVuZGx5IGVycm9yIG1lc3NhZ2UgYmFzZWQgb24gdGhlIGN1cnJlbnQgc3RhdGUgYW5kIGdpdmVuIHRva2VuXHJcbiAgICAgKiAjTk9URTogdGhpcyAuZmlsdGVyKCkgY291bGQgYmUgb3B0aW1pc2VkIHdpdGgganVzdCB1c2luZyBhIG5vcm1hbCBmb3IgbG9vcFxyXG4gICAgICogQHBhcmFtIHRva2VuIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZnJpZW5kbHlFcnJvcih0b2tlbjogSVRva2VuLCBtZXNzYWdlOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLnRva2Vucy5pbmRleE9mKHRva2VuKSA9PT0gLTEpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdnaXZlbiB0b2tlbiBkb2VzIG5vdCBleGlzdCBpbiBzdHJlYW0nO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnYXRoZXIgYWxsIHRva2VucyB1cCB0byAyIGxpbmVzIGJlZm9yZSB0aGUgcGFzc2VkIHRva2VuXHJcbiAgICAgICAgY29uc3QgbGluZXMgPSBbdG9rZW4ubGluZSAtIDIsIHRva2VuLmxpbmUgLSAxLCB0b2tlbi5saW5lXS5maWx0ZXIobGluZSA9PiBsaW5lID4gMCk7XHJcbiAgICAgICAgY29uc3Qgb3V0cHV0ID0gbGluZXMubWFwKChsaW5lKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHtsaW5lfXwgYCArIHRoaXMudG9rZW5zLmZpbHRlcigodG9rZW4pID0+IHRva2VuLmxpbmUgPT09IGxpbmUpLnJlZHVjZSgoc3RyLCB0b2tlbiwgaW5kZXgsIGFycmF5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbmRlbnQgPSAodG9rZW4uY29sIC0gMSkgLSBzdHIubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmVlZHNTcGFjZSA9IGluZGV4ICE9PSAwICYmIChhcnJheVtpbmRleCAtIDFdLnR5cGUgPT09IFRva2VuVHlwZS5LRVlXT1JEIHx8IGFycmF5W2luZGV4IC0gMV0udHlwZSA9PT0gVG9rZW5UeXBlLklERU5USUZJRVIgfHwgYXJyYXlbaW5kZXggLSAxXS50eXBlID09PSBUb2tlblR5cGUuQ09NTUEpICYmICh0b2tlbi50eXBlID09PSBUb2tlblR5cGUuSURFTlRJRklFUiB8fCB0b2tlbi50eXBlID09PSBUb2tlblR5cGUuS0VZV09SRCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyICsgKG5lZWRzU3BhY2UgPyAnICcgOiAnJykgKyAnICcucmVwZWF0KChpbmRlbnQgPj0gMCkgPyBpbmRlbnQgOiAwKSArIHRva2VuLmxleGVtZTtcclxuICAgICAgICAgICAgfSwgJycpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gaW5zZXJ0IGJpZyBhcnJvdyB0byBmYXVsdHkgdG9rZW5cclxuICAgICAgICBjb25zdCBwcmVmaXggPSAnICcucmVwZWF0KHRva2VuLmxpbmUudG9TdHJpbmcoKS5sZW5ndGgpICsgJyAgJztcclxuICAgICAgICBjb25zdCBleHRyYSA9ICcgJy5yZXBlYXQodG9rZW4uY29sIC0gMSkgKyAnXicucmVwZWF0KHRva2VuLmxleGVtZS5sZW5ndGgpO1xyXG4gICAgICAgIG91dHB1dC5wdXNoKHByZWZpeCArIGV4dHJhICsgJ1xcbicgKyBtZXNzYWdlKTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gb3V0cHV0LmpvaW4oJ1xcbicpO1xyXG4gICAgfVxyXG59XHJcbiIsIlxyXG5pbXBvcnQgVG9rZW5TdHJlYW0gZnJvbSAnLi9Ub2tlblN0cmVhbSc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgVG9rZW5TdHJlYW1cclxufVxyXG4iLCJpbXBvcnQgeyBJVG9rZW4gfSBmcm9tIFwiLi4vVG9rZW5cIjtcclxuaW1wb3J0IHsgVG9rZW5TdHJlYW0gfSBmcm9tIFwiLi4vVG9rZW5TdHJlYW1cIjtcclxuaW1wb3J0IHsgSVZpc2l0b3IgfSBmcm9tIFwiLi4vVmlzaXRvclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW50ZXJmYWNlIElOb2RlIHtcclxuICAgIHRva2VuPzogSVRva2VuO1xyXG4gICAgc3RyZWFtPzogVG9rZW5TdHJlYW07XHJcbiAgICBub2RlVHlwZTogc3RyaW5nO1xyXG4gICAgYWNjZXB0KHZpc2l0b3I6IElWaXNpdG9yKTogdm9pZDsgXHJcbiAgICBmcmllbmRseUVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZztcclxuICAgIFtTeW1ib2wudG9TdHJpbmdUYWddOiBzdHJpbmc7XHJcbiAgICB0b0pTT04oKTogSU5vZGU7XHJcbn1cclxuIiwiaW1wb3J0IHsgSVRva2VuIH0gZnJvbSAnLi4vVG9rZW4nO1xyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSB9IGZyb20gJy4uL1Rva2VuU3RyZWFtJztcclxuaW1wb3J0IHsgSVZpc2l0b3IgfSBmcm9tICcuLi9WaXNpdG9yJztcclxuXHJcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gJy4vRXhwcmVzc2lvbic7XHJcbmltcG9ydCBTdGF0ZW1lbnQgZnJvbSAnLi9TdGF0ZW1lbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmV0dXJuU3RhdGVtZW50IGV4dGVuZHMgU3RhdGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyAgZXhwcmVzc2lvbjogRXhwcmVzc2lvbiwgaW5mbzogUGFydGlhbDx7IHRva2VuOiBJVG9rZW4sIHN0cmVhbTogVG9rZW5TdHJlYW0gfT4gPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlcHQodmlzaXRvcjogSVZpc2l0b3IpIHtcclxuICAgICAgICB0aGlzLmV4cHJlc3Npb24uYWNjZXB0KHZpc2l0b3IpO1xyXG4gICAgICAgIHZpc2l0b3IudmlzaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnUmV0dXJuU3RhdGVtZW50JztcclxuICAgIH1cclxufVxyXG4iLCJcclxuZXhwb3J0IGRlZmF1bHQgaW50ZXJmYWNlIElDb25zdGFudDxUPiB7XHJcbiAgICB2YWx1ZTogVDtcclxufVxyXG4iLCJpbXBvcnQgeyBJVG9rZW4gfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5cclxuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSAnLi9FeHByZXNzaW9uJztcclxuaW1wb3J0IElDb25zdGFudCBmcm9tICcuL0lDb25zdGFudCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb25zdGFudDxUID0gYW55PiBleHRlbmRzIEV4cHJlc3Npb24gaW1wbGVtZW50cyBJQ29uc3RhbnQ8VD4ge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IHN0cmluZywgcHVibGljICB2YWx1ZTogVCwgaW5mbzogUGFydGlhbDx7dG9rZW46IElUb2tlbiwgc3RyZWFtOiBUb2tlblN0cmVhbX0+ID0ge30pIHtcclxuICAgICAgICBzdXBlcihpbmZvKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnQ29uc3RhbnQnO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBJVG9rZW4gfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5cclxuaW1wb3J0IENvbnN0YW50IGZyb20gJy4vQ29uc3RhbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW50ZWdlckNvbnN0YW50PFQgZXh0ZW5kcyBudW1iZXIgPSBudW1iZXI+IGV4dGVuZHMgQ29uc3RhbnQ8VD4ge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IFQsIGluZm86IFBhcnRpYWw8eyB0b2tlbjogSVRva2VuLCBzdHJlYW06IFRva2VuU3RyZWFtIH0+ID0ge30pIHtcclxuICAgICAgICBzdXBlcignaW50MTZfdCcsIHZhbHVlLCBpbmZvKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnSW50ZWdlckNvbnN0YW50JztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJVG9rZW4gfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5pbXBvcnQgeyBJVmlzaXRvciB9IGZyb20gJy4uL1Zpc2l0b3InO1xyXG5cclxuaW1wb3J0IE5vZGUgZnJvbSAnLi9Ob2RlJztcclxuaW1wb3J0IFN0YXRlbWVudCBmcm9tICcuL1N0YXRlbWVudCc7XHJcbmltcG9ydCBSZXR1cm5TdGF0ZW1lbnQgZnJvbSAnLi9SZXR1cm5TdGF0ZW1lbnQnXHJcbmltcG9ydCBJbnRlZ2VyQ29uc3RhbnQgZnJvbSAnLi9JbnRlZ2VyQ29uc3RhbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRnVuY3Rpb25EZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHR5cGU6IHN0cmluZywgcHVibGljIG5hbWU6IHN0cmluZywgcHVibGljIHN0YXRlbWVudHM6IFN0YXRlbWVudFtdLCBpbmZvOiBQYXJ0aWFsPHsgdG9rZW46IElUb2tlbiwgc3RyZWFtOiBUb2tlblN0cmVhbSB9PiA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIoaW5mbyk7XHJcblxyXG4gICAgICAgIC8vIGltcGxpY2l0bHkgcmV0dXJuIDAgaWYgdGhlIGxhc3Qgc3RhdGVtZW50IGlzIG5vdCBhIHJldHVybiBzdGF0ZW1lbnRcclxuICAgICAgICBjb25zdCBsYXN0ID0gdGhpcy5zdGF0ZW1lbnRzW3RoaXMuc3RhdGVtZW50cy5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZiAoIShsYXN0IGluc3RhbmNlb2YgUmV0dXJuU3RhdGVtZW50KSkge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IG5ldyBJbnRlZ2VyQ29uc3RhbnQoMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlbWVudCA9IG5ldyBSZXR1cm5TdGF0ZW1lbnQodmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlbWVudHMucHVzaChzdGF0ZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGFjY2VwdCh2aXNpdG9yOiBJVmlzaXRvcikge1xyXG4gICAgICAgIHZpc2l0b3IudmlzaXQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZW1lbnRzLmZvckVhY2goc3RhdGVtZW50ID0+IHN0YXRlbWVudC5hY2NlcHQodmlzaXRvcikpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gJ0Z1bmN0aW9uRGVjbGFyYXRpb24nO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgSVRva2VuIH0gZnJvbSAnLi4vVG9rZW4nO1xyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSB9IGZyb20gJy4uL1Rva2VuU3RyZWFtJztcclxuaW1wb3J0IHsgSVZpc2l0b3IgfSBmcm9tICcuLi9WaXNpdG9yJztcclxuXHJcbmltcG9ydCBGdW5jdGlvbkRlY2xhcmF0aW9uIGZyb20gJy4vRnVuY3Rpb25EZWNsYXJhdGlvbic7XHJcbmltcG9ydCBOb2RlIGZyb20gJy4vTm9kZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9ncmFtIGV4dGVuZHMgTm9kZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZGVjbGFyYXRpb25zOiBGdW5jdGlvbkRlY2xhcmF0aW9uW10sIGluZm86IFBhcnRpYWw8eyB0b2tlbjogSVRva2VuLCBzdHJlYW06IFRva2VuU3RyZWFtIH0+ID0ge30pIHtcclxuICAgICAgICBzdXBlcihpbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWNjZXB0KHZpc2l0b3I6IElWaXNpdG9yKSB7XHJcbiAgICAgICAgdGhpcy5kZWNsYXJhdGlvbnMuZm9yRWFjaChkZWNsYXJhdGlvbiA9PiBkZWNsYXJhdGlvbi5hY2NlcHQodmlzaXRvcikpO1xyXG4gICAgICAgIHZpc2l0b3IudmlzaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnUHJvZ3JhbSc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgU3RhdGVtZW50IGZyb20gJy4vU3RhdGVtZW50JztcclxuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSBcIi4vRXhwcmVzc2lvblwiO1xyXG5cclxuaW1wb3J0IHsgSVRva2VuIH0gZnJvbSAnLi4vVG9rZW4nO1xyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSB9IGZyb20gJy4uL1Rva2VuU3RyZWFtJztcclxuaW1wb3J0IHsgSVZpc2l0b3IgfSBmcm9tICcuLi9WaXNpdG9yJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlY2xhcmF0aW9uIGV4dGVuZHMgU3RhdGVtZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBleHByZXNzaW9uPzogRXhwcmVzc2lvbiwgaW5mbzogUGFydGlhbDx7IHRva2VuOiBJVG9rZW4sIHN0cmVhbTogVG9rZW5TdHJlYW0gfT4gPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhY2NlcHQodmlzaXRvcjogSVZpc2l0b3IpIHtcclxuICAgICAgICBpZiAodGhpcy5leHByZXNzaW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvbi5hY2NlcHQodmlzaXRvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZpc2l0b3IudmlzaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnRGVjbGFyYXRpb24nO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IElUb2tlbiB9IGZyb20gJy4uL1Rva2VuJztcclxuaW1wb3J0IHsgVG9rZW5TdHJlYW0gfSBmcm9tICcuLi9Ub2tlblN0cmVhbSc7XHJcbmltcG9ydCB7IElWaXNpdG9yIH0gZnJvbSAnLi4vVmlzaXRvcic7XHJcblxyXG5pbXBvcnQgRXhwcmVzc2lvbiBmcm9tICcuL0V4cHJlc3Npb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmluYXJ5T3AgZXh0ZW5kcyBFeHByZXNzaW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBvcGVyYXRvcjogSVRva2VuLCBwdWJsaWMgbGVmdDogRXhwcmVzc2lvbiwgcHVibGljIHJpZ2h0OiBFeHByZXNzaW9uLCBpbmZvOiBQYXJ0aWFsPHsgdG9rZW46IElUb2tlbiwgc3RyZWFtOiBUb2tlblN0cmVhbSB9PiA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIoaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjY2VwdCh2aXNpdG9yOiBJVmlzaXRvcikge1xyXG4gICAgICAgIHRoaXMucmlnaHQuYWNjZXB0KHZpc2l0b3IpO1xyXG4gICAgICAgIHRoaXMubGVmdC5hY2NlcHQodmlzaXRvcik7XHJcbiAgICAgICAgdmlzaXRvci52aXNpdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICdCaW5hcnlPcCc7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBJVG9rZW4gfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5pbXBvcnQgeyBJVmlzaXRvciB9IGZyb20gJy4uL1Zpc2l0b3InO1xyXG5cclxuaW1wb3J0IEV4cHJlc3Npb24gZnJvbSAnLi9FeHByZXNzaW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuYXJ5T3AgZXh0ZW5kcyBFeHByZXNzaW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyAgb3BlcmF0b3I6IElUb2tlbiwgcHVibGljICBleHByZXNzaW9uOiBFeHByZXNzaW9uLCBpbmZvOiBQYXJ0aWFsPHsgdG9rZW46IElUb2tlbiwgc3RyZWFtOiBUb2tlblN0cmVhbSB9PiA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIoaW5mbyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjY2VwdCh2aXNpdG9yOiBJVmlzaXRvcikge1xyXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbi5hY2NlcHQodmlzaXRvcik7XHJcbiAgICAgICAgdmlzaXRvci52aXNpdCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICdVbmFyeU9wJztcclxuICAgIH1cclxufSIsImltcG9ydCBFeHByZXNzaW9uIGZyb20gXCIuL0V4cHJlc3Npb25cIjtcclxuXHJcbmltcG9ydCB7IElUb2tlbiB9IGZyb20gJy4uL1Rva2VuJztcclxuaW1wb3J0IHsgVG9rZW5TdHJlYW0gfSBmcm9tICcuLi9Ub2tlblN0cmVhbSc7XHJcbmltcG9ydCB7IElWaXNpdG9yIH0gZnJvbSAnLi4vVmlzaXRvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWYXJpYWJsZVJlZmVyZW5jZSBleHRlbmRzIEV4cHJlc3Npb24ge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgaW5mbzogUGFydGlhbDx7IHRva2VuOiBJVG9rZW4sIHN0cmVhbTogVG9rZW5TdHJlYW0gfT4gPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKGluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIFxyXG4gICAgcHVibGljIGFjY2VwdCh2aXNpdG9yOiBJVmlzaXRvcikge1xyXG4gICAgICAgIHZpc2l0b3IudmlzaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnVmFyaWFibGVSZWZlcmVuY2UnO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCBJTm9kZSBmcm9tICcuL0lOb2RlJztcclxuaW1wb3J0IE5vZGUgZnJvbSAnLi9Ob2RlJztcclxuXHJcbmltcG9ydCBQcm9ncmFtIGZyb20gJy4vUHJvZ3JhbSc7XHJcbmltcG9ydCBGdW5jdGlvbkRlY2xhcmF0aW9uIGZyb20gJy4vRnVuY3Rpb25EZWNsYXJhdGlvbic7XHJcblxyXG5pbXBvcnQgU3RhdGVtZW50IGZyb20gJy4vU3RhdGVtZW50JztcclxuaW1wb3J0IERlY2xhcmF0aW9uIGZyb20gJy4vRGVjbGFyYXRpb24nO1xyXG5pbXBvcnQgUmV0dXJuU3RhdGVtZW50IGZyb20gJy4vUmV0dXJuU3RhdGVtZW50JztcclxuXHJcbmltcG9ydCBFeHByZXNzaW9uIGZyb20gJy4vRXhwcmVzc2lvbic7XHJcbmltcG9ydCBBc3NpZ25tZW50IGZyb20gJy4vQXNzaWdubWVudCc7XHJcbmltcG9ydCBCaW5hcnlPcCBmcm9tICcuL0JpbmFyeU9wJztcclxuaW1wb3J0IFVuYXJ5T3AgZnJvbSAnLi9VbmFyeU9wJztcclxuaW1wb3J0IFZhcmlhYmxlUmVmZXJlbmNlIGZyb20gJy4vVmFyaWFibGVSZWZlcmVuY2UnO1xyXG5cclxuaW1wb3J0IElDb25zdGFudCBmcm9tICcuL0lDb25zdGFudCc7XHJcbmltcG9ydCBDb25zdGFudCBmcm9tICcuL0NvbnN0YW50JztcclxuaW1wb3J0IEludGVnZXJDb25zdGFudCBmcm9tICcuL0ludGVnZXJDb25zdGFudCc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgSU5vZGUsXHJcbiAgICBOb2RlLFxyXG4gICAgXHJcbiAgICBQcm9ncmFtLFxyXG4gICAgRnVuY3Rpb25EZWNsYXJhdGlvbixcclxuICAgIFxyXG4gICAgU3RhdGVtZW50LFxyXG4gICAgRGVjbGFyYXRpb24sXHJcbiAgICBSZXR1cm5TdGF0ZW1lbnQsXHJcbiAgICBcclxuICAgIEV4cHJlc3Npb24sXHJcbiAgICBBc3NpZ25tZW50LFxyXG4gICAgQmluYXJ5T3AsXHJcbiAgICBVbmFyeU9wLFxyXG4gICAgVmFyaWFibGVSZWZlcmVuY2UsXHJcblxyXG4gICAgSUNvbnN0YW50LFxyXG4gICAgQ29uc3RhbnQsXHJcbiAgICBJbnRlZ2VyQ29uc3RhbnQsXHJcbn1cclxuIiwiaW1wb3J0IHsgSU5vZGUgfSBmcm9tIFwiLi4vQVNUXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgSVZpc2l0b3I8VCA9IGFueT4ge1xyXG4gICAgdmlzaXQobm9kZSA6IElOb2RlKTogdm9pZDtcclxuICAgIHJlc3VsdD86IFQ7XHJcbn1cclxuIiwiaW1wb3J0IHsgSU5vZGUgfSBmcm9tICcuLi9BU1QnO1xyXG5cclxuaW1wb3J0IElWaXNpdG9yIGZyb20gJy4vSVZpc2l0b3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlzaXRvcjxUID0gc3RyaW5nPiBpbXBsZW1lbnRzIElWaXNpdG9yPFQ+IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aXNpdChub2RlOiBJTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHZpc2l0b3IgPSAodGhpcyBhcyBhbnkpWyd2aXNpdCcgKyBub2RlLm5vZGVUeXBlXSBhcyAoKG5vZGU6IElOb2RlLCAuLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCkgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB2aXNpdG9yID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHZpc2l0b3IuY2FsbCh0aGlzLCBub2RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgSVZpc2l0b3IgZnJvbSAnLi9JVmlzaXRvcic7XHJcbmltcG9ydCBWaXNpdG9yIGZyb20gJy4vVmlzaXRvcic7XHJcblxyXG5leHBvcnQge1xyXG4gICAgSVZpc2l0b3IsXHJcbiAgICBWaXNpdG9yLFxyXG59XHJcbiIsImltcG9ydCB7IElUb2tlbiB9IGZyb20gXCIuLi9Ub2tlblwiO1xyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSB9IGZyb20gXCIuLi9Ub2tlblN0cmVhbVwiO1xyXG5pbXBvcnQgeyBJVmlzaXRvciB9IGZyb20gJy4uL1Zpc2l0b3InO1xyXG5cclxuaW1wb3J0IElOb2RlIGZyb20gXCIuL0lOb2RlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOb2RlIGltcGxlbWVudHMgSU5vZGUge1xyXG4gICAgcHVibGljIHRva2VuPzogSVRva2VuO1xyXG4gICAgcHVibGljIHN0cmVhbT86IFRva2VuU3RyZWFtO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihpbmZvOiBQYXJ0aWFsPHsgdG9rZW46IElUb2tlbiwgc3RyZWFtOiBUb2tlblN0cmVhbSB9PiA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy50b2tlbiA9IGluZm8udG9rZW47XHJcbiAgICAgICAgdGhpcy5zdHJlYW0gPSBpbmZvLnN0cmVhbTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcHVibGljIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnTm9kZSc7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBub2RlVHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcykuc2xpY2UoOCwgLTEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmcmllbmRseUVycm9yKG1lc3NhZ2U6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN0cmVhbSB8fCAhdGhpcy50b2tlbikge1xyXG4gICAgICAgICAgICByZXR1cm4gbWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyZWFtLmZyaWVuZGx5RXJyb3IodGhpcy50b2tlbiwgbWVzc2FnZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFjY2VwdCh2aXNpdG9yOiBJVmlzaXRvcikge1xyXG4gICAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0KHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0b0pTT04oKSB7XHJcbiAgICAgICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHRoaXMpLmZpbHRlcigoW25hbWUsIHZhbHVlXSkgPT4gbmFtZSAhPT0gJ3N0cmVhbScgJiYgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKTtcclxuICAgICAgICBjb25zdCBtYXAgPSBlbnRyaWVzLnJlZHVjZSgobWFwLCBbbmFtZSwgdmFsdWVdKSA9PiB7IG1hcFtuYW1lXSA9IHZhbHVlOyByZXR1cm4gbWFwOyB9LCB7fSBhcyBhbnkpO1xyXG4gICAgICAgIG1hcC5ub2RlVHlwZSA9IHRoaXMubm9kZVR5cGU7XHJcbiAgICAgICAgcmV0dXJuIG1hcDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJVG9rZW4gfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5cclxuaW1wb3J0IE5vZGUgZnJvbSAnLi9Ob2RlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRlbWVudCBleHRlbmRzIE5vZGUge1xyXG4gICAgY29uc3RydWN0b3IoaW5mbzogUGFydGlhbDx7IHRva2VuOiBJVG9rZW4sIHN0cmVhbTogVG9rZW5TdHJlYW0gfT4gPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKGluZm8pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICdTdGF0ZW1lbnQnO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IElUb2tlbiB9IGZyb20gJy4uL1Rva2VuJztcclxuaW1wb3J0IHsgVG9rZW5TdHJlYW0gfSBmcm9tICcuLi9Ub2tlblN0cmVhbSc7XHJcblxyXG5pbXBvcnQgU3RhdGVtZW50IGZyb20gJy4vU3RhdGVtZW50JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV4cHJlc3Npb24gZXh0ZW5kcyBTdGF0ZW1lbnQge1xyXG4gICAgY29uc3RydWN0b3IoaW5mbzogUGFydGlhbDx7IHRva2VuOiBJVG9rZW4sIHN0cmVhbTogVG9rZW5TdHJlYW0gfT4gPSB7fSkge1xyXG4gICAgICAgIHN1cGVyKGluZm8pO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0IFtTeW1ib2wudG9TdHJpbmdUYWddKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICdFeHByZXNzaW9uJztcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IEV4cHJlc3Npb24gZnJvbSBcIi4vRXhwcmVzc2lvblwiO1xyXG5cclxuaW1wb3J0IHsgSVRva2VuIH0gZnJvbSAnLi4vVG9rZW4nO1xyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSB9IGZyb20gJy4uL1Rva2VuU3RyZWFtJztcclxuaW1wb3J0IHsgSVZpc2l0b3IgfSBmcm9tICcuLi9WaXNpdG9yJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzc2lnbm1lbnQgZXh0ZW5kcyBFeHByZXNzaW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHB1YmxpYyBleHByZXNzaW9uOiBFeHByZXNzaW9uLCBpbmZvOiBQYXJ0aWFsPHsgdG9rZW46IElUb2tlbiwgc3RyZWFtOiBUb2tlblN0cmVhbSB9PiA9IHt9KSB7XHJcbiAgICAgICAgc3VwZXIoaW5mbyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBhY2NlcHQodmlzaXRvcjogSVZpc2l0b3IpIHtcclxuICAgICAgICB0aGlzLmV4cHJlc3Npb24uYWNjZXB0KHZpc2l0b3IpO1xyXG4gICAgICAgIHZpc2l0b3IudmlzaXQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBbU3ltYm9sLnRvU3RyaW5nVGFnXSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiAnQXNzaWdubWVudCc7XHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbmV4cG9ydCBkZWZhdWx0IGludGVyZmFjZSBJTGFiZWwge1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIGFubm90YXRlKG1zZzogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgdG9TdHJpbmcoKTogc3RyaW5nO1xyXG59IiwiaW1wb3J0IHsgQ29tcGlsZXJFcnJvciB9IGZyb20gXCIuLi9FcnJvclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhY2tGcmFtZSB7XHJcbiAgICBwcml2YXRlIG9mZnNldCA9IDA7XHJcbiAgICBwcml2YXRlIGRpY3QgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0KGtleTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMuZGljdC5oYXMoa2V5KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgQ29tcGlsZXJFcnJvcihgVmFyaWFibGUgZG9lcyBub3QgZXhpc3Q6ICcke2tleX0nYCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmRpY3QuZ2V0KGtleSkhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQoa2V5OiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLmRpY3QuaGFzKGtleSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IENvbXBpbGVyRXJyb3IoYFZhcmlhYmxlIGFscmVhZHkgZGVjbGFyZWQ6ICcke2tleX0nYClcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kaWN0LnNldChrZXksICsrdGhpcy5vZmZzZXQpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZXhpc3RzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGljdC5oYXMoa2V5KTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBBU1QgZnJvbSAnLi4vQVNUJztcclxuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSAnLi4vVG9rZW4nO1xyXG5pbXBvcnQgeyBWaXNpdG9yIH0gZnJvbSAnLi4vVmlzaXRvcic7XHJcblxyXG5cclxuaW1wb3J0IElMYWJlbCBmcm9tICcuL0lMYWJlbCc7XHJcbmltcG9ydCBTdGFja0ZyYW1lIGZyb20gJy4vU3RhY2tGcmFtZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2RlR2VuVmlzaXRvciBleHRlbmRzIFZpc2l0b3I8c3RyaW5nPiB7XHJcbiAgICBwcml2YXRlIGxhYmVsSWQgPSAwO1xyXG4gICAgcHJpdmF0ZSB0ZXh0ID0gJyc7XHJcbiAgICBwcml2YXRlIHN0YWNrRnJhbWUgPSBuZXcgU3RhY2tGcmFtZSgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlc3VsdCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdlbmVyYXRlTGFiZWwoZXh0cmE6IHN0cmluZyA9ICcnKTogSUxhYmVsIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IGBMQUJFTF8ke3RoaXMubGFiZWxJZCsrfSR7KGV4dHJhKSA/IGBfJHtleHRyYX1gIDogJyd9YDtcclxuICAgICAgICBjb25zdCBhbm5vdGF0ZSA9IChtc2c6IHN0cmluZykgPT4gbGFiZWwgKyBgXyR7bXNnfWA7XHJcbiAgICAgICAgY29uc3QgdG9TdHJpbmcgPSAoKSA9PiBsYWJlbDtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBsYWJlbCxcclxuICAgICAgICAgICAgYW5ub3RhdGUsXHJcbiAgICAgICAgICAgIHRvU3RyaW5nLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlzaXRGdW5jdGlvbkRlY2xhcmF0aW9uKG5vZGU6IEFTVC5GdW5jdGlvbkRlY2xhcmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0ICs9IGBcXFxyXG4ke25vZGUubmFtZX06XHJcbiAgUFVTSCBCUFxyXG4gIE1PViBCUCwgU1BcclxuYDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlzaXRSZXR1cm5TdGF0ZW1lbnQobm9kZTogQVNULlJldHVyblN0YXRlbWVudCkge1xyXG4gICAgICAgIHRoaXMudGV4dCArPSBgXFxcclxuICBQT1AgQVxyXG4gIE1PViBTUCwgQlBcclxuICBQT1AgQlBcclxuICByZXRcclxuYDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlzaXREZWNsYXJhdGlvbihub2RlOiBBU1QuRGVjbGFyYXRpb24pIHtcclxuICAgICAgICB0aGlzLnN0YWNrRnJhbWUuc2V0KG5vZGUubmFtZSk7XHJcbiAgICAgICAgaWYgKG5vZGUuZXhwcmVzc2lvbikge1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgKz0gYFxcXHJcbjsgdmFyICcke25vZGUubmFtZX0nID0gPGV4cHI+XHJcbmBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgKz0gYFxcXHJcbiAgUFVTSCAwIDsgdmFyICcke25vZGUubmFtZX0nXHJcbmA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB2aXNpdFZhcmlhYmxlUmVmZXJlbmNlKG5vZGU6IEFTVC5WYXJpYWJsZVJlZmVyZW5jZSkge1xyXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IHRoaXMuc3RhY2tGcmFtZS5nZXQobm9kZS5uYW1lKTtcclxuICAgICAgICB0aGlzLnRleHQgKz0gYFxcXHJcbiAgUFVTSCBbQlAgLSAke29mZnNldH1dIDsgJyR7bm9kZS5uYW1lfSdcclxuYDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlzaXRBc3NpZ25tZW50KG5vZGU6IEFTVC5Bc3NpZ25tZW50KSB7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5zdGFja0ZyYW1lLmdldChub2RlLm5hbWUpO1xyXG4gICAgICAgIHRoaXMudGV4dCArPSBgXFxcclxuICBQT1AgW0JQIC0gJHtvZmZzZXR9XSwgQSA7ICcke25vZGUubmFtZX0nID0gPGV4cHI+XHJcbmBcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlzaXRCaW5hcnlPcChub2RlOiBBU1QuQmluYXJ5T3ApIHtcclxuICAgICAgICBsZXQgYXNtID0gYFxcXHJcbiAgUE9QIEFcclxuICBQT1AgQlxyXG5gO1xyXG4gICAgICAgIHN3aXRjaCAobm9kZS5vcGVyYXRvci50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLk1VTFRJUExJQ0FUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gJyAgTVVMIEInXHJcbiAgICAgICAgICAgICAgICBhc20gKz0gJ1xcbic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3NpbW9uOTg3L011Y2gtQXNzZW1ibHktUmVxdWlyZWQvd2lraS9JbnN0cnVjdGlvbi1TZXQjZGl2XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLkRJVklTSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gJyAgTU9WIFksIDBcXG4nO1xyXG4gICAgICAgICAgICAgICAgYXNtICs9ICcgIERJViBCXFxuJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vc2ltb245ODcvTXVjaC1Bc3NlbWJseS1SZXF1aXJlZC93aWtpL0luc3RydWN0aW9uLVNldCNkaXZcclxuICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuTU9EVUxPOiB7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gJyAgTU9WIFksIDBcXG4nO1xyXG4gICAgICAgICAgICAgICAgYXNtICs9ICcgIERJViBCXFxuJztcclxuICAgICAgICAgICAgICAgIGFzbSArPSAnICBNT1YgQSwgWVxcbic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRva2VuVHlwZS5BRERJVElPTjoge1xyXG4gICAgICAgICAgICAgICAgYXNtICs9ICcgIEFERCBBLCBCXFxuJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLk5FR0FUSU9OOiB7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gJyAgU1VCIEEsIEJcXG4nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuQklUV0lTRV9BTkQ6IHtcclxuICAgICAgICAgICAgICAgIGFzbSArPSAnICBBTkQgQSwgQlxcbic7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuQklUV0lTRV9PUjoge1xyXG4gICAgICAgICAgICAgICAgYXNtICs9ICcgIE9SIEEsIEJcXG4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLkJJVFdJU0VfWE9SOiB7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gJyAgWE9SIEEsIEJcXG4nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLk5PVF9FUVVBTFM6IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZW5lcmF0ZUxhYmVsKCdub3RfZXF1YWxzJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cnVlTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgnZW5kJyk7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gYFxcXHJcbiAgQ01QIEEsIEJcclxuICBKTlogJHt0cnVlTGFiZWx9XHJcbiAgTU9WIEEsIDBcclxuICBKTVAgJHtlbmRMYWJlbH1cclxuJHt0cnVlTGFiZWx9OlxyXG4gIE1PViBBLCAxXHJcbiR7ZW5kTGFiZWx9OlxyXG5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuRVFVQUxTOiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2VuZXJhdGVMYWJlbCgnZXF1YWxzJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cnVlTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgnZW5kJyk7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gYFxcXHJcbiAgQ01QIEEsIEJcclxuICBKWiAke3RydWVMYWJlbH1cclxuICBNT1YgQSwgMFxyXG4gIEpNUCAke2VuZExhYmVsfVxyXG4ke3RydWVMYWJlbH06XHJcbiAgTU9WIEEsIDFcclxuJHtlbmRMYWJlbH06XHJcbmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRva2VuVHlwZS5MRVNTX1RIQU46IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5nZW5lcmF0ZUxhYmVsKCdsZXNzX3RoYW4nKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRydWVMYWJlbCA9IGxhYmVsLmFubm90YXRlKCd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRMYWJlbCA9IGxhYmVsLmFubm90YXRlKCdlbmQnKTtcclxuICAgICAgICAgICAgICAgIGFzbSArPSBgXFxcclxuICBDTVAgQSwgQlxyXG4gIEpMICR7dHJ1ZUxhYmVsfVxyXG4gIE1PViBBLCAwXHJcbiAgSk1QICR7ZW5kTGFiZWx9XHJcbiR7dHJ1ZUxhYmVsfTpcclxuICBNT1YgQSwgMVxyXG4ke2VuZExhYmVsfTpcclxuYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRva2VuVHlwZS5MRVNTX09SX0VRVUFMUzoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdlbmVyYXRlTGFiZWwoJ2xlc3Nfb3JfZXF1YWxzJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cnVlTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgnZW5kJyk7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gYFxcXHJcbiAgQ01QIEEsIEJcclxuICBKTEUgJHt0cnVlTGFiZWx9XHJcbiAgTU9WIEEsIDBcclxuICBKTVAgJHtlbmRMYWJlbH1cclxuJHt0cnVlTGFiZWx9OlxyXG4gIE1PViBBLCAxXHJcbiR7ZW5kTGFiZWx9OlxyXG5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLkdSRUFURVJfVEhBTjoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdlbmVyYXRlTGFiZWwoJ2dyZWF0ZXJfdGhhbicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHJ1ZUxhYmVsID0gbGFiZWwuYW5ub3RhdGUoJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVuZExhYmVsID0gbGFiZWwuYW5ub3RhdGUoJ2VuZCcpO1xyXG4gICAgICAgICAgICAgICAgYXNtICs9IGBcXFxyXG4gIENNUCBBLCBCXHJcbiAgSkcgJHt0cnVlTGFiZWx9XHJcbiAgTU9WIEEsIDBcclxuICBKTVAgJHtlbmRMYWJlbH1cclxuJHt0cnVlTGFiZWx9OlxyXG4gIE1PViBBLCAxXHJcbiR7ZW5kTGFiZWx9OlxyXG5gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLkdSRUFURVJfT1JfRVFVQUxTOiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuZ2VuZXJhdGVMYWJlbCgnZ3JlYXRlcl9vcl9lcXVhbHMnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRydWVMYWJlbCA9IGxhYmVsLmFubm90YXRlKCd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRMYWJlbCA9IGxhYmVsLmFubm90YXRlKCdlbmQnKTtcclxuICAgICAgICAgICAgICAgIGFzbSArPSBgXFxcclxuICBDTVAgQSwgQlxyXG4gIEpHRSAke3RydWVMYWJlbH1cclxuICBNT1YgQSwgMFxyXG4gIEpNUCAke2VuZExhYmVsfVxyXG4ke3RydWVMYWJlbH06XHJcbiAgTU9WIEEsIDFcclxuJHtlbmRMYWJlbH06XHJcbmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuTE9HSUNBTF9PUjoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdlbmVyYXRlTGFiZWwoJ2xvZ2ljYWxfb3InKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRydWVMYWJlbCA9IGxhYmVsLmFubm90YXRlKCd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbmRMYWJlbCA9IGxhYmVsLmFubm90YXRlKCdlbmQnKTtcclxuICAgICAgICAgICAgICAgIGFzbSArPSBgXFxcclxuICBPUiBBLCBCXHJcbiAgSk5aICR7dHJ1ZUxhYmVsfVxyXG4gIE1PViBBLCAwXHJcbiAgSk1QICR7ZW5kTGFiZWx9XHJcbiR7dHJ1ZUxhYmVsfTpcclxuICBNT1YgQSwgMVxyXG4ke2VuZExhYmVsfTpcclxuYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFRva2VuVHlwZS5MT0dJQ0FMX0FORDoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdlbmVyYXRlTGFiZWwoJ2xvZ2ljYWxfYW5kJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cnVlTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgnZW5kJyk7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gYFxyXG4gIENNUCBBLCAwXHJcbiAgSk5aICR7dHJ1ZUxhYmVsfVxyXG4gIENNUCBCLCAwXHJcbiAgSk5aICR7dHJ1ZUxhYmVsfVxyXG4gIE1PViBBLCAwXHJcbiAgSk1QICR7ZW5kTGFiZWx9XHJcbiR7dHJ1ZUxhYmVsfTpcclxuICBNT1YgQSwgMVxyXG4ke2VuZExhYmVsfTpcclxuYDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFzbSArPSAnICBQVVNIIEFcXG4nXHJcbiAgICAgICAgdGhpcy50ZXh0ICs9IGFzbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlzaXRVbmFyeU9wKG5vZGU6IEFTVC5VbmFyeU9wKSB7XHJcbiAgICAgICAgbGV0IGFzbSA9IGBcXFxyXG4gIFBPUCBBXHJcbmBcclxuICAgICAgICBzd2l0Y2ggKG5vZGUub3BlcmF0b3IudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFRva2VuVHlwZS5MT0dJQ0FMX05PVDoge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSB0aGlzLmdlbmVyYXRlTGFiZWwoJ2xvZ2ljYWxfbm90Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cnVlTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgndHJ1ZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZW5kTGFiZWwgPSBsYWJlbC5hbm5vdGF0ZSgnZW5kJyk7XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gYFxcXHJcbiAgVEVTVCBBLCBBXHJcbiAgSlogJHt0cnVlTGFiZWx9XHJcbiAgTU9WIEEsIDBcclxuICBKTVAgJHtlbmRMYWJlbH1cclxuJHt0cnVlTGFiZWx9OlxyXG4gIE1PViBBLCAxXHJcbiR7ZW5kTGFiZWx9OlxyXG4gIFBVU0ggQVxyXG5gO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuQklUV0lTRV9OT1Q6XHJcbiAgICAgICAgICAgICAgICBhc20gKz0gYFxcXHJcbiAgTk9UIEFcclxuYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLk5FR0FUSU9OOlxyXG4gICAgICAgICAgICAgICAgYXNtICs9IGBcXFxyXG4gIE5FRyBBXHJcbmA7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgYXNtICs9ICcgIFBVU0ggQVxcbic7XHJcbiAgICAgICAgdGhpcy50ZXh0ICs9IGFzbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlzaXRJbnRlZ2VyQ29uc3RhbnQobm9kZTogQVNULkludGVnZXJDb25zdGFudCkge1xyXG4gICAgICAgIHRoaXMudGV4dCArPSBgXFxcclxuICBQVVNIICR7bm9kZS52YWx1ZX1cclxuYDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJTm9kZSB9IGZyb20gJy4uL0FTVCc7XHJcbmltcG9ydCBWaXNpdG9yIGZyb20gJy4vQ29kZUdlblZpc2l0b3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuZXJhdGUoYXN0OiBJTm9kZSk6IHN0cmluZyB7XHJcbiAgICBjb25zdCB2aXNpdG9yID0gbmV3IFZpc2l0b3IoKTtcclxuICAgIGFzdC5hY2NlcHQodmlzaXRvcik7XHJcbiAgICByZXR1cm4gdmlzaXRvci5yZXN1bHQ7XHJcbn1cclxuIiwiaW1wb3J0IGdlbmVyYXRlIGZyb20gJy4vZ2VuZXJhdGUnO1xyXG5pbXBvcnQgQ29kZUdlblZpc2l0b3IgZnJvbSAnLi9Db2RlR2VuVmlzaXRvcic7XHJcbmltcG9ydCBJTGFiZWwgZnJvbSAnLi9JTGFiZWwnO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIENvZGVHZW5WaXNpdG9yLFxyXG4gICAgSUxhYmVsLFxyXG4gICAgZ2VuZXJhdGUsXHJcbn0iLCJjb25zdCBrZXl3b3JkcyA9IFtcclxuICAgICdpbnQnLFxyXG4gICAgJ3JldHVybicsXHJcbiAgICAnaWYnLFxyXG4gICAgJ2Vsc2UnLFxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQga2V5d29yZHM7XHJcbiIsIlxyXG5pbXBvcnQga2V5d29yZHMgZnJvbSAnLi9rZXl3b3Jkcyc7XHJcblxyXG5jb25zdCBpcyA9IHtcclxuICAgIGRlY2ltYWw6IChjOiBzdHJpbmcpID0+IGMgPj0gJzEnICYmIGMgPD0gJzknLFxyXG4gICAgZGlnaXQ6IChjOiBzdHJpbmcpID0+IGMgPT09ICcwJyB8fCBpcy5kZWNpbWFsKGMpLFxyXG4gICAgaGV4OiAoYzogc3RyaW5nKSA9PiAoYyA+PSAnYScgJiYgYzw9ICdmJykgfHwgKGMgPj0gJ0EnICYmIGMgPD0gJ0YnKSB8fCBpcy5kaWdpdChjKSxcclxuICAgIGlkZW50aWZpZXI6IChjOiBzdHJpbmcpID0+IGlzLmlkZW50aWZpZXJTdGFydChjKSB8fCBpcy5kaWdpdChjKSxcclxuICAgIGlkZW50aWZpZXJTdGFydDogKGM6IHN0cmluZykgPT4gYyA9PT0gJ18nIHx8IChjID49ICdhJyAmJiBjIDw9ICd6JykgfHwgKGMgPj0gJ0EnICYmIGMgPD0gJ1onKSxcclxuICAgIGtleXdvcmQ6IChjOiBzdHJpbmcpID0+IGtleXdvcmRzLmluY2x1ZGVzKGMpLFxyXG4gICAgb2N0YWw6IChjOiBzdHJpbmcpID0+IGMgPj0gJzAnICYmIGMgPD0gJzcnLFxyXG4gICAgaW50ZWdlclN1ZmZpeDogKGM6IHN0cmluZykgPT4gYyA9PT0gJ3UnIHx8IGMgPT09ICdVJyB8fCBjID09PSAnTCcgfHwgYyA9PT0gJ2wnLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaXM7IiwiaW1wb3J0IHsgRU9GRXJyb3IsIEluZGV4T3V0T2ZCb3VuZHNFcnJvciB9ICBmcm9tICcuLi9FcnJvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHJpbmdTdHJlYW0ge1xyXG4gICAgcHJpdmF0ZSBnZXQgY3Vyc29yKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZXZlbnRzIGluZGV4IGZyb20gYmVpbmcgbGFyZ2VyIHRoYW4gaW5wdXQgbGVuZ3RoXHJcbiAgICAgKlxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqIEBtZW1iZXJvZiBTdHJpbmdTdHJlYW1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzZXQgY3Vyc29yKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gdGhpcy5pbnB1dC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEluZGV4T3V0T2ZCb3VuZHNFcnJvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jdXJzb3IgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlcHJlc2VudHMgZW5kIG9mIHN0cmVhbSBmbGFnXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZW9mKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnNvciA9PT0gdGhpcy5pbnB1dC5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogaW50ZXJuYWwgY3Vyc29yXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2N1cnNvciA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBpbnB1dCBJbnB1dCBzdHJpbmcgdG8gd3JhcCB0aGUgc3RyZWFtXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBpbnB1dDogc3RyaW5nKSB7fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGVlayBgbGVuZ3RoYCBhbW91bnQgb2YgY2hhcmFjdGVycyBhbmQgcmV0dXJuIHRoZW0gYXMgYSBzdHJpbmdcclxuICAgICAqIEB0aHJvd3Mge0VPRkVycm9yfVxyXG4gICAgICogQHBhcmFtIGxlbmd0aFxyXG4gICAgICogQHBhcmFtIG5vVGhyb3cgc3VwcHJlc3MgRU9GRXJyb3JcclxuICAgICAqL1xyXG4gICAgcHVibGljIHBlZWsobGVuZ3RoOiBudW1iZXIgPSAxLCBub1Rocm93OiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghbm9UaHJvdykge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrRU9GRXJyb3IobGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3Qgc3Vic3RyID0gdGhpcy5pbnB1dC5zdWJzdHIodGhpcy5jdXJzb3IsIGxlbmd0aCk7XHJcbiAgICAgICAgcmV0dXJuIHN1YnN0cjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN1bWUgYGxlbmd0aGAgYW1vdW50IG9mIGNoYXJhY3RlcnMgYW5kIHJldHVybiB0aGVtIGFzIGEgc3RyaW5nXHJcbiAgICAgKiBAcGFyYW0gbGVuZ3RoXHJcbiAgICAgKiBAcGFyYW0gbm9UaHJvdyBzdXBwcmVzcyBFT0ZFcnJvclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmV4dChsZW5ndGg6IG51bWJlciA9IDEsIG5vVGhyb3c6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFub1Rocm93KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tFT0ZFcnJvcihsZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBzdWJzdHIgPSB0aGlzLmlucHV0LnN1YnN0cih0aGlzLmN1cnNvciwgbGVuZ3RoKTtcclxuICAgICAgICB0aGlzLmN1cnNvciArPSBsZW5ndGg7XHJcbiAgICAgICAgcmV0dXJuIHN1YnN0cjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN1bWUgY2hhcmFjdGVycyBhcyBsb25nIGFzIHRoZSBjb25kaXRpb24gY2FsbGJhY2sgcmV0dXJucyB0cnVlXHJcbiAgICAgKiBAcGFyYW0gY29uZGl0aW9uIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGRldGVybWluY2UgaWYgbW9yZSBjaGFyYWN0ZXJzIHNob3VsZCBiZSBjb25zdW1lZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd2hpbGUoY29uZGl0aW9uOiAoYzogc3RyaW5nLCBpbmRleD86IG51bWJlcikgPT4gYm9vbGVhbik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuICAgICAgICBsZXQgc3Vic3RyID0gJyc7XHJcbiAgICAgICAgd2hpbGUoIXRoaXMuZW9mKSB7XHJcbiAgICAgICAgICAgIGlmIChjb25kaXRpb24odGhpcy5wZWVrKCksIGluZGV4KyspKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJzdHIgKz0gdGhpcy5uZXh0KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3Vic3RyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHRocm93cyB7RU9GRXJyb3J9XHJcbiAgICAgKiBAcGFyYW0gbGVuZ3RoIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNoZWNrRU9GRXJyb3IobGVuZ3RoOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJzb3IgKyBsZW5ndGggPiB0aGlzLmlucHV0Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFT0ZFcnJvcihgI1N0cmluZ1N0cmVhbS5uZXh0KCR7bGVuZ3RofSkgLSBleGNlZWRlZCBlbmQgb2YgZmlsZWApO1xyXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IFN0cmluZ1N0cmVhbSBmcm9tICcuL1N0cmluZ1N0cmVhbSc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgU3RyaW5nU3RyZWFtLFxyXG59XHJcbiIsIlxyXG5pbXBvcnQgaXMgZnJvbSAnLi9pcyc7XHJcblxyXG5pbXBvcnQgeyBTdHJpbmdTdHJlYW0gfSBmcm9tICcuLi9TdHJpbmdTdHJlYW0nO1xyXG5pbXBvcnQgeyBJVG9rZW4sIFRva2VuLCBUb2tlblR5cGUgfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IEVPRkVycm9yIH0gZnJvbSAnLi4vRXJyb3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGV4KGlucHV0OiBzdHJpbmcgfCBTdHJpbmdTdHJlYW0sIGZpbGVuYW1lPzogc3RyaW5nKTogSVRva2VuW10ge1xyXG4gICAgY29uc3Qgc3RyZWFtOiBTdHJpbmdTdHJlYW0gPSAhKGlucHV0IGluc3RhbmNlb2YgU3RyaW5nU3RyZWFtKSA/IG5ldyBTdHJpbmdTdHJlYW0oaW5wdXQpIDogaW5wdXQ7XHJcbiAgICBcclxuICAgIGNvbnN0IHRva2VuczogSVRva2VuW10gPSBbXTtcclxuICAgIGNvbnN0IGluZm8gPSB7XHJcbiAgICAgICAgbmFtZTogZmlsZW5hbWUgfHwgJ1thbm9ueW1vdXNdJyxcclxuICAgICAgICBsaW5lOiAxLFxyXG4gICAgICAgIGNvbDogMCxcclxuICAgIH07XHJcblxyXG4gICAgLy8gaGVscGVyIHRvIGtlZXAgdHJhY2sgb2YgJ2luZm8uY29sJ1xyXG4gICAgY29uc3QgbmV4dCA9ICgpID0+IHsgaW5mby5jb2wrKzsgcmV0dXJuIHN0cmVhbS5uZXh0KCl9O1xyXG4gICAgY29uc3QgcGVlayA9ICgpID0+IHsgdHJ5IHsgcmV0dXJuIHN0cmVhbS5wZWVrKCk7IH0gY2F0Y2ggKGUpIHsgaWYgKGUgaW5zdGFuY2VvZiBFT0ZFcnJvcikgcmV0dXJuICcnOyB0aHJvdyBlOyB9fTtcclxuXHJcbiAgICBsZXhpbmc6IHdoaWxlKCFzdHJlYW0uZW9mKSB7XHJcbiAgICAgICAgY29uc3QgY3JlYXRlVG9rZW4gPSAodHlwZTogVG9rZW5UeXBlLCBsZXhlbWU6IHN0cmluZykgPT4gdG9rZW5zLnB1c2gobmV3IFRva2VuKHR5cGUsIGxleGVtZSwgeyBuYW1lOiBpbmZvLm5hbWUsIGxpbmU6IGluZm8ubGluZSwgY29sOiBpbmZvLmNvbCB9KSk7XHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVyID0gbmV4dCgpO1xyXG5cclxuICAgICAgICAvLyBpZ25vcmUgd2hpdGVzcGFjZVxyXG4gICAgICAgIHN3aXRjaCAoY2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ1xcbic6XHJcbiAgICAgICAgICAgICAgICBpbmZvLmxpbmUrKztcclxuICAgICAgICAgICAgICAgIGluZm8uY29sID0gMTtcclxuICAgICAgICAgICAgY2FzZSAnXFxyJzpcclxuICAgICAgICAgICAgICAgIC8vIFRPRE86IHN1cHBvcnQgYWxsIGxpbmUgZW5kaW5nc1xyXG4gICAgICAgICAgICBjYXNlICdcXHQnOlxyXG4gICAgICAgICAgICBjYXNlICdcXHYnOlxyXG4gICAgICAgICAgICBjYXNlICcgJzpcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG9uZSBsZXR0ZXIgcHVuY3R1YXRpb25cclxuICAgICAgICBzd2l0Y2ggKGNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBjYXNlICd7JzpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5MRUZUX0JSQUNFLCBjaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWUgbGV4aW5nO1xyXG4gICAgICAgICAgICBjYXNlICd9JzpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5SSUdIVF9CUkFDRSwgY2hhcmFjdGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgY2FzZSAnKCc6XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuTEVGVF9QQVJFTiwgY2hhcmFjdGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgY2FzZSAnKSc6XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuUklHSFRfUEFSRU4sIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgICAgIGNhc2UgJywnOlxyXG4gICAgICAgICAgICAgICAgY3JlYXRlVG9rZW4oVG9rZW5UeXBlLkNPTU1BLCBjaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWUgbGV4aW5nO1xyXG4gICAgICAgICAgICBjYXNlICc7JzpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5TRU1JX0NPTE9OLCBjaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWUgbGV4aW5nO1xyXG4gICAgICAgICAgICBjYXNlICd+JzpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5CSVRXSVNFX05PVCwgY2hhcmFjdGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgY2FzZSAnXic6XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuQklUV0lTRV9YT1IsIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgICAgIGNhc2UgJyUnOlxyXG4gICAgICAgICAgICAgICAgY3JlYXRlVG9rZW4oVG9rZW5UeXBlLk1PRFVMTywgY2hhcmFjdGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgY2FzZSAnOic6XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuQ09MT04sIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgICAgIGNhc2UgJz8nOlxyXG4gICAgICAgICAgICAgICAgY3JlYXRlVG9rZW4oVG9rZW5UeXBlLlFVRVNUSU9OX01BUkssIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBtdWx0aXBsZSBsZXR0ZXIgcHVuY3R1YXRpb25cclxuICAgICAgICBzd2l0Y2ggKGNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBjYXNlICc9JzpcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAocGVlaygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnPSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5FUVVBTFMsIGNoYXJhY3RlciArIG5leHQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuQVNTSUdOLCBjaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJy0nOlxyXG4gICAgICAgICAgICAgICAgY3JlYXRlVG9rZW4oVG9rZW5UeXBlLk5FR0FUSU9OLCBjaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWUgbGV4aW5nO1xyXG4gICAgICAgICAgICBjYXNlICchJzpcclxuICAgICAgICAgICAgICAgIHN3aXRjaChwZWVrKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICc9JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVG9rZW4oVG9rZW5UeXBlLk5PVF9FUVVBTFMsIGNoYXJhY3RlciArIG5leHQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuTE9HSUNBTF9OT1QsIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnKyc6XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuQURESVRJT04sIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgICAgIGNhc2UgJyonOlxyXG4gICAgICAgICAgICAgICAgY3JlYXRlVG9rZW4oVG9rZW5UeXBlLk1VTFRJUExJQ0FUSU9OLCBjaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgY29udGludWUgbGV4aW5nO1xyXG4gICAgICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5ESVZJU0lPTiwgY2hhcmFjdGVyKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgY2FzZSAnfCc6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHBlZWsoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3wnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuTE9HSUNBTF9PUiwgY2hhcmFjdGVyICsgbmV4dCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgbGV4aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5CSVRXSVNFX09SLCBjaGFyYWN0ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgJyYnOlxyXG4gICAgICAgICAgICAgICAgc3dpdGNoKHBlZWsoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJyYnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuTE9HSUNBTF9BTkQsIGNoYXJhY3RlciArIG5leHQoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuQklUV0lTRV9BTkQsIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnPCc6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2gocGVlaygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnPSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5MRVNTX09SX0VRVUFMUywgY2hhcmFjdGVyICsgbmV4dCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgbGV4aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5MRVNTX1RIQU4sIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAnPic6XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2gocGVlaygpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnPSc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5HUkVBVEVSX09SX0VRVUFMUywgY2hhcmFjdGVyICsgbmV4dCgpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgbGV4aW5nO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5HUkVBVEVSX1RIQU4sIGNoYXJhY3Rlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIGxleGluZztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGludGVnZXIgbGl0ZXJhbDogaHR0cHM6Ly9lbi5jcHByZWZlcmVuY2UuY29tL3cvYy9sYW5ndWFnZS9pbnRlZ2VyX2NvbnN0YW50XHJcbiAgICAgICAgLy8gZmxvYXQgbGl0ZXJhbDogaHR0cHM6Ly9lbi5jcHByZWZlcmVuY2UuY29tL3cvYy9sYW5ndWFnZS9mbG9hdGluZ19jb25zdGFudFxyXG4gICAgICAgIC8vICNUT0RPOiBzdXBwb3J0IGludGVnZXIgYW5kIGZsb2F0IHN1ZmZpeGVzXHJcbiAgICAgICAgLy8gYmFzZSAxMFxyXG4gICAgICAgIGlmIChpcy5kZWNpbWFsKGNoYXJhY3RlcikpIHtcclxuICAgICAgICAgICAgY29uc3QgaW50ZWdlciA9IGNoYXJhY3RlciArIHN0cmVhbS53aGlsZShpcy5kaWdpdCk7XHJcbiAgICAgICAgICAgIGlmIChwZWVrKCkgPT09ICcuJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZG90ID0gbmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmxvYXQgPSBzdHJlYW0ud2hpbGUoaXMuZGlnaXQpO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlVG9rZW4oVG9rZW5UeXBlLkZMT0FUX0xJVEVSQUwsIGludGVnZXIgKyBkb3QgKyBmbG9hdCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuSU5URUdFUl9MSVRFUkFMLCBpbnRlZ2VyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAjVE9ETzogc3VwcG9ydCBmbG9hdCBoZXhhZGVjaW1hbFxyXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgPT09ICcwJykge1xyXG4gICAgICAgICAgICBjb25zdCBjaGFyID0gcGVlaygpO1xyXG4gICAgICAgICAgICAvLyBoZXhhZGVjaW1hbFxyXG4gICAgICAgICAgICBpZiAoY2hhciA9PT0gJ3gnIHx8IGNoYXIgPT09ICdYJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IG5leHQoKTtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZVRva2VuKFRva2VuVHlwZS5JTlRFR0VSX0xJVEVSQUwsIGNoYXJhY3RlciArIHggKyBzdHJlYW0ud2hpbGUoaXMuaGV4KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gb2N0YWxcclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuSU5URUdFUl9MSVRFUkFMLCBjaGFyYWN0ZXIgKyBzdHJlYW0ud2hpbGUoaXMub2N0YWwpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZGVudGlmaWVycyBhbmQga2V5d29yZHNcclxuICAgICAgICBpZiAoaXMuaWRlbnRpZmllclN0YXJ0KGNoYXJhY3RlcikpIHtcclxuICAgICAgICAgICAgY29uc3QgbGV4ZW1lID0gY2hhcmFjdGVyICsgc3RyZWFtLndoaWxlKGlzLmlkZW50aWZpZXIpO1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlID0gKGlzLmtleXdvcmQobGV4ZW1lKSkgPyBUb2tlblR5cGUuS0VZV09SRCA6IFRva2VuVHlwZS5JREVOVElGSUVSO1xyXG4gICAgICAgICAgICBjcmVhdGVUb2tlbih0eXBlLCBsZXhlbWUpO1xyXG4gICAgICAgICAgICBjb250aW51ZSBsZXhpbmc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjcmVhdGVUb2tlbihUb2tlblR5cGUuVU5LT1dOLCBjaGFyYWN0ZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0b2tlbnM7XHJcbn07XHJcbiIsImltcG9ydCBpcyBmcm9tICcuL2lzJztcclxuaW1wb3J0IGtleXdvcmRzIGZyb20gJy4va2V5d29yZHMnO1xyXG5pbXBvcnQgbGV4IGZyb20gJy4vbGV4JztcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBsZXgsXHJcbiAgICBpcyxcclxuICAgIGtleXdvcmRzLFxyXG59XHJcbiIsImltcG9ydCB7IEJpbmFyeU9wLCBFeHByZXNzaW9uLCBJbnRlZ2VyQ29uc3RhbnQsIElOb2RlLCBOb2RlLCBVbmFyeU9wIH0gZnJvbSAnLi4vQVNUJztcclxuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSAnLi4vVG9rZW4nO1xyXG5pbXBvcnQgeyBWaXNpdG9yIH0gZnJvbSAnLi4vVmlzaXRvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpbWl6ZXJWaXNpdG9yIGV4dGVuZHMgVmlzaXRvcjxJTm9kZT4ge1xyXG4gICAgcHJpdmF0ZSBhc3Q/OiBJTm9kZTtcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlc3VsdCgpOiBJTm9kZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFzdCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGAndGhpcy5hc3QnIGlzIHVuZGVmaW5lZGApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5hc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlzaXQobm9kZTogSU5vZGUpIHtcclxuICAgICAgICAvLyBUaGlzIGlzIGEgcmVhbCBkaXJ0eSB3YXkgb2YgcmVwbGFjaW5nIEFTVCBub2RlcyB3aXRoIGV2YWx1YXRlZCBub2Rlc1xyXG4gICAgICAgIC8vIHByb3BlciB3YXkgd291bGQgYmUgYnVpbGRpbmcgYSBuZXcgYXN0XHJcbiAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBmb3JpblxyXG4gICAgICAgIGZvciAoY29uc3QgcHJvcCBpbiBub2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlZiA9IChub2RlIGFzIGFueSlbcHJvcF07XHJcbiAgICAgICAgICAgIGlmICghKHJlZiBpbnN0YW5jZW9mIE5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHJlZiBpbnN0YW5jZW9mIEJpbmFyeU9wKSB7XHJcbiAgICAgICAgICAgICAgICAobm9kZSBhcyBhbnkpW3Byb3BdID0gdGhpcy5ldmFsdWF0ZUJpbmFyeU9wKHJlZik7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocmVmIGluc3RhbmNlb2YgVW5hcnlPcCkge1xyXG4gICAgICAgICAgICAgICAgKG5vZGUgYXMgYW55KVtwcm9wXSA9IHRoaXMuZXZhbHVhdGVVbmFyeU9wKHJlZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hc3QgPSBub2RlO1xyXG4gICAgICAgIHN1cGVyLnZpc2l0KG5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmFsdWF0ZVVuYXJ5T3Aobm9kZTogVW5hcnlPcCk6IEV4cHJlc3Npb24ge1xyXG4gICAgICAgIGlmICgobm9kZS5leHByZXNzaW9uIGluc3RhbmNlb2YgSW50ZWdlckNvbnN0YW50KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2gobm9kZS5vcGVyYXRvci50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRva2VuVHlwZS5ORUdBVElPTjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gLSgobm9kZS5leHByZXNzaW9uIGFzIEludGVnZXJDb25zdGFudCkudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50ZWdlckNvbnN0YW50KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLkJJVFdJU0VfTk9UOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSB+KChub2RlLmV4cHJlc3Npb24gYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlZ2VyQ29uc3RhbnQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuTE9HSUNBTF9OT1Q6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICgobm9kZS5leHByZXNzaW9uIGFzIEludGVnZXJDb25zdGFudCkudmFsdWUpID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlZ2VyQ29uc3RhbnQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBldmFsdWF0ZUJpbmFyeU9wKG5vZGU6IEJpbmFyeU9wKTogRXhwcmVzc2lvbiB7XHJcbiAgICAgICAgaWYgKChub2RlLmxlZnQgaW5zdGFuY2VvZiBJbnRlZ2VyQ29uc3RhbnQpICYmIChub2RlLnJpZ2h0IGluc3RhbmNlb2YgSW50ZWdlckNvbnN0YW50KSkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG5vZGUub3BlcmF0b3IudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuQURESVRJT046IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IChub2RlLmxlZnQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSArIChub2RlLnJpZ2h0IGFzIEludGVnZXJDb25zdGFudCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlZ2VyQ29uc3RhbnQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuTkVHQVRJT046IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IChub2RlLmxlZnQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSAtIChub2RlLnJpZ2h0IGFzIEludGVnZXJDb25zdGFudCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlZ2VyQ29uc3RhbnQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuTEVTU19USEFOOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAoKG5vZGUubGVmdCBhcyBJbnRlZ2VyQ29uc3RhbnQpLnZhbHVlIDwgKG5vZGUucmlnaHQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSkgPyAxIDogMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEludGVnZXJDb25zdGFudCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRva2VuVHlwZS5MRVNTX09SX0VRVUFMUzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gKChub2RlLmxlZnQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSA8PSAobm9kZS5yaWdodCBhcyBJbnRlZ2VyQ29uc3RhbnQpLnZhbHVlKSA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50ZWdlckNvbnN0YW50KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLkdSRUFURVJfVEhBTjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gKChub2RlLmxlZnQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSA+IChub2RlLnJpZ2h0IGFzIEludGVnZXJDb25zdGFudCkudmFsdWUpID8gMSA6IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlZ2VyQ29uc3RhbnQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuR1JFQVRFUl9PUl9FUVVBTFM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICgobm9kZS5sZWZ0IGFzIEludGVnZXJDb25zdGFudCkudmFsdWUgPj0gKG5vZGUucmlnaHQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSkgPyAxIDogMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEludGVnZXJDb25zdGFudCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyB0aGVzZSBzaG91bGQgZm9sbG93IHRoZSBDUFUvQUxVIGJlaGF2aW91clxyXG4gICAgICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuTVVMVElQTElDQVRJT046IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IChub2RlLmxlZnQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSAqIChub2RlLnJpZ2h0IGFzIEludGVnZXJDb25zdGFudCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlZ2VyQ29uc3RhbnQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gSVIgd291bGQgYmUgd2F5IGJldHRlciBmb3IgdGhpc1xyXG4gICAgICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuRElWSVNJT046IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IE1hdGguZmxvb3IoKG5vZGUubGVmdCBhcyBJbnRlZ2VyQ29uc3RhbnQpLnZhbHVlIC8gKG5vZGUucmlnaHQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlZ2VyQ29uc3RhbnQodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2FzZSBUb2tlblR5cGUuTU9EVUxPOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAobm9kZS5sZWZ0IGFzIEludGVnZXJDb25zdGFudCkudmFsdWUgJSAobm9kZS5yaWdodCBhcyBJbnRlZ2VyQ29uc3RhbnQpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50ZWdlckNvbnN0YW50KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlIFRva2VuVHlwZS5FUVVBTFM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IChub2RlLmxlZnQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSA9PT0gKG5vZGUucmlnaHQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50ZWdlckNvbnN0YW50KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhc2UgVG9rZW5UeXBlLk5PVF9FUVVBTFM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IChub2RlLmxlZnQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSAhPT0gKG5vZGUucmlnaHQgYXMgSW50ZWdlckNvbnN0YW50KS52YWx1ZSA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSW50ZWdlckNvbnN0YW50KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBJTm9kZSB9IGZyb20gJy4uL0FTVCc7XHJcbmltcG9ydCBWaXNpdG9yIGZyb20gJy4vT3B0aW1pemVyVmlzaXRvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcHRpbWl6ZShhc3Q6IElOb2RlKTogSU5vZGUge1xyXG4gICAgY29uc3QgdmlzaXRvciA9IG5ldyBWaXNpdG9yKCk7XHJcbiAgICBhc3QuYWNjZXB0KHZpc2l0b3IpO1xyXG4gICAgcmV0dXJuIGFzdDtcclxufVxyXG4iLCJpbXBvcnQgb3B0aW1pemUgZnJvbSAnLi9vcHRpbWl6ZSc7XHJcbmltcG9ydCBPcHRpbWl6ZXJWaXNpdG9yIGZyb20gJy4vT3B0aW1pemVyVmlzaXRvcic7XHJcblxyXG5leHBvcnQge1xyXG4gICAgb3B0aW1pemUsXHJcbiAgICBPcHRpbWl6ZXJWaXNpdG9yLFxyXG59XHJcbiIsIlxyXG5leHBvcnQgZGVmYXVsdCBpbnRlcmZhY2UgSU9wdGlvbnMge1xyXG4gICAgb3B0aW1pemU6IGJvb2xlYW47XHJcbn1cclxuIiwiXHJcbmNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBvcHRpbWl6ZTogZmFsc2UsXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBvcHRpb25zXHJcbiIsImltcG9ydCBJT3B0aW9ucyBmcm9tICcuL0lPcHRpb25zJztcclxuaW1wb3J0IGRlZmF1bHRPcHRpb25zIGZyb20gJy4vb3B0aW9ucyc7XHJcblxyXG5leHBvcnQge1xyXG4gICAgSU9wdGlvbnMsXHJcbiAgICBkZWZhdWx0T3B0aW9ucyxcclxufVxyXG4iLCJpbXBvcnQgeyBJbnRlZ2VyQ29uc3RhbnQsIFVuYXJ5T3AsIEV4cHJlc3Npb24sIFZhcmlhYmxlUmVmZXJlbmNlIH0gZnJvbSAnLi4vQVNUJztcclxuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSAnLi4vVG9rZW4nO1xyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSB9IGZyb20gJy4uL1Rva2VuU3RyZWFtJztcclxuXHJcbmltcG9ydCBwYXJzZUV4cHJlc3Npb24gZnJvbSAnLi9wYXJzZUV4cHJlc3Npb24nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VGYWN0b3IoXHJcbiAgICBzdHJlYW06IFRva2VuU3RyZWFtXHJcbik6IEV4cHJlc3Npb24ge1xyXG4gICAgbGV0IGV4cHJlc3Npb247XHJcbiAgICBjb25zdCBwZWVrID0gc3RyZWFtLnBlZWsoKTtcclxuXHJcbiAgICBpZiAocGVlay50eXBlID09PSBUb2tlblR5cGUuTEVGVF9QQVJFTikge1xyXG4gICAgICAgIHN0cmVhbS5uZXh0KCk7XHJcblxyXG4gICAgICAgIC8vIGNvZGUgZ2VuZXJhdGlvbiBoYXMgYW4gZXJyb3IgdGhhdCBpcyB0byBzdHVwaWQgdG8gZml4XHJcbiAgICAgICAgaWYgKCdkZWZhdWx0JyBpbiBwYXJzZUV4cHJlc3Npb24pIHtcclxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICAgICAgICBwYXJzZUV4cHJlc3Npb24gPSBwYXJzZUV4cHJlc3Npb25bJ2RlZmF1bHQnXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGV4cHJlc3Npb24gPSBwYXJzZUV4cHJlc3Npb24oc3RyZWFtKTtcclxuICAgICAgICBzdHJlYW0uZXhwZWN0KFRva2VuVHlwZS5SSUdIVF9QQVJFTik7XHJcbiAgICB9IGVsc2UgaWYgKHBlZWsudHlwZSAmIFRva2VuVHlwZS5VTkFSWV9PUCkge1xyXG4gICAgICAgIGNvbnN0IG9wZXJhdG9yID0gc3RyZWFtLm5leHQoKTtcclxuICAgICAgICBjb25zdCBmYWN0b3IgPSBwYXJzZUZhY3RvcihzdHJlYW0sKTtcclxuICAgICAgICBleHByZXNzaW9uID0gbmV3IFVuYXJ5T3Aob3BlcmF0b3IsIGZhY3RvciwgeyB0b2tlbjogb3BlcmF0b3IsIHN0cmVhbSB9KTtcclxuICAgIH0gZWxzZSBpZiAocGVlay50eXBlID09PSBUb2tlblR5cGUuSURFTlRJRklFUikge1xyXG4gICAgICAgIGNvbnN0IG5hbWUgPSBzdHJlYW0ubmV4dCgpO1xyXG4gICAgICAgIGV4cHJlc3Npb24gPSBuZXcgVmFyaWFibGVSZWZlcmVuY2UobmFtZS5sZXhlbWUsIHsgdG9rZW46IG5hbWUsIHN0cmVhbX0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBjb25zdGFudCA9IHN0cmVhbS5leHBlY3QoVG9rZW5UeXBlLklOVEVHRVJfTElURVJBTCk7XHJcbiAgICAgICAgZXhwcmVzc2lvbiA9IG5ldyBJbnRlZ2VyQ29uc3RhbnQoTnVtYmVyLnBhcnNlSW50KGNvbnN0YW50LmxleGVtZSksIHsgdG9rZW46IGNvbnN0YW50LCBzdHJlYW0gfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXhwcmVzc2lvbjtcclxufTtcclxuIiwiaW1wb3J0IHsgQmluYXJ5T3AsIEV4cHJlc3Npb24gfSBmcm9tICcuLi9BU1QnO1xyXG5pbXBvcnQgeyBUb2tlblR5cGUgfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5cclxuaW1wb3J0IHBhcnNlRmFjdG9yIGZyb20gJy4vcGFyc2VGYWN0b3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VUZXJtKFxyXG4gICAgc3RyZWFtOiBUb2tlblN0cmVhbVxyXG4pOiBFeHByZXNzaW9uIHtcclxuICAgIGxldCBmYWN0b3IgPSBwYXJzZUZhY3RvcihzdHJlYW0pO1xyXG4gICAgd2hpbGUgKHN0cmVhbS5wZWVrKCkudHlwZSAmIFRva2VuVHlwZS5URVJNKSB7XHJcbiAgICAgICAgY29uc3Qgb3BlcmF0b3IgPSBzdHJlYW0ubmV4dCgpO1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gcGFyc2VGYWN0b3Ioc3RyZWFtKTtcclxuICAgICAgICBmYWN0b3IgPSBuZXcgQmluYXJ5T3Aob3BlcmF0b3IsIGZhY3RvciwgcmlnaHQsIHsgdG9rZW46IGZhY3Rvci50b2tlbiwgc3RyZWFtIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhY3RvcjtcclxufTtcclxuIiwiaW1wb3J0IHsgRXhwcmVzc2lvbiwgQmluYXJ5T3AgfSBmcm9tICcuLi9BU1QnO1xyXG5pbXBvcnQgeyBUb2tlblR5cGUgfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5cclxuaW1wb3J0IHBhcnNlVGVybSBmcm9tICcuL3BhcnNlVGVybSc7O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VBZGRpdGl2ZShcclxuICAgIHN0cmVhbTogVG9rZW5TdHJlYW1cclxuKTogRXhwcmVzc2lvbiB7XHJcbiAgICBsZXQgZXhwcmVzc2lvbiA9IHBhcnNlVGVybShzdHJlYW0pO1xyXG4gICAgd2hpbGUgKHN0cmVhbS5wZWVrKCkudHlwZSAmIFRva2VuVHlwZS5BRERJVElWRSkge1xyXG4gICAgICAgIGNvbnN0IG9wZXJhdG9yID0gc3RyZWFtLm5leHQoKTtcclxuICAgICAgICBjb25zdCByaWdodCA9IHBhcnNlVGVybShzdHJlYW0pO1xyXG4gICAgICAgIGV4cHJlc3Npb24gPSBuZXcgQmluYXJ5T3Aob3BlcmF0b3IsIGV4cHJlc3Npb24sIHJpZ2h0LCB7IHRva2VuOiBleHByZXNzaW9uLnRva2VuLCBzdHJlYW0gfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXhwcmVzc2lvbjtcclxufTtcclxuIiwiaW1wb3J0IHsgQmluYXJ5T3AsIEV4cHJlc3Npb24gfSBmcm9tICcuLi9BU1QnO1xyXG5pbXBvcnQgeyBUb2tlblR5cGUgfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5cclxuaW1wb3J0IHBhcnNlQWRkaXRpdmUgZnJvbSAnLi9wYXJzZUFkZGl0aXZlJzs7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZUxvZ2ljYWxPcihcclxuICAgIHN0cmVhbTogVG9rZW5TdHJlYW1cclxuKTogRXhwcmVzc2lvbiB7XHJcbiAgICBsZXQgZXhwcmVzc2lvbiA9IHBhcnNlQWRkaXRpdmUoc3RyZWFtKTtcclxuICAgIHdoaWxlIChzdHJlYW0ucGVlaygpLnR5cGUgJiBUb2tlblR5cGUuUkVMQVRJT05BTCkge1xyXG4gICAgICAgIGNvbnN0IG9wZXJhdG9yID0gc3RyZWFtLm5leHQoKTtcclxuICAgICAgICBjb25zdCByaWdodCA9IHBhcnNlQWRkaXRpdmUoc3RyZWFtKTtcclxuICAgICAgICBleHByZXNzaW9uID0gbmV3IEJpbmFyeU9wKG9wZXJhdG9yLCBleHByZXNzaW9uLCByaWdodCwgeyB0b2tlbjogZXhwcmVzc2lvbi50b2tlbiwgc3RyZWFtIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGV4cHJlc3Npb247XHJcbn07XHJcbiIsImltcG9ydCB7IEJpbmFyeU9wLCBFeHByZXNzaW9uIH0gZnJvbSAnLi4vQVNUJztcclxuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSAnLi4vVG9rZW4nO1xyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSB9IGZyb20gJy4uL1Rva2VuU3RyZWFtJztcclxuXHJcbmltcG9ydCBwYXJzZVJlbGF0aW9uYWwgZnJvbSAnLi9wYXJzZVJlbGF0aW9uYWwnOztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlRXF1YWxpdHkoXHJcbiAgICBzdHJlYW06IFRva2VuU3RyZWFtXHJcbik6IEV4cHJlc3Npb24ge1xyXG4gICAgbGV0IGV4cHJlc3Npb24gPSBwYXJzZVJlbGF0aW9uYWwoc3RyZWFtKTtcclxuICAgIHdoaWxlIChzdHJlYW0ucGVlaygpLnR5cGUgJiBUb2tlblR5cGUuRVFVQUxJVFkpIHtcclxuICAgICAgICBjb25zdCBvcGVyYXRvciA9IHN0cmVhbS5uZXh0KCk7XHJcbiAgICAgICAgY29uc3QgcmlnaHQgPSBwYXJzZVJlbGF0aW9uYWwoc3RyZWFtKTtcclxuICAgICAgICBleHByZXNzaW9uID0gbmV3IEJpbmFyeU9wKG9wZXJhdG9yLCBleHByZXNzaW9uLCByaWdodCwgeyB0b2tlbjogZXhwcmVzc2lvbi50b2tlbiwgc3RyZWFtIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGV4cHJlc3Npb247XHJcbn07XHJcbiIsImltcG9ydCB7IEJpbmFyeU9wLCBFeHByZXNzaW9uIH0gZnJvbSAnLi4vQVNUJztcclxuaW1wb3J0IHsgVG9rZW5UeXBlIH0gZnJvbSAnLi4vVG9rZW4nO1xyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSB9IGZyb20gJy4uL1Rva2VuU3RyZWFtJztcclxuXHJcbmltcG9ydCBwYXJzZUVxdWFsaXR5IGZyb20gJy4vcGFyc2VFcXVhbGl0eSc7O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VMb2dpY2FsT3IoXHJcbiAgICBzdHJlYW06IFRva2VuU3RyZWFtXHJcbik6IEV4cHJlc3Npb24ge1xyXG4gICAgbGV0IGV4cHJlc3Npb24gPSBwYXJzZUVxdWFsaXR5KHN0cmVhbSk7XHJcbiAgICB3aGlsZSAoc3RyZWFtLnBlZWsoKS50eXBlICYgVG9rZW5UeXBlLkxPR0lDQUxfQU5EKSB7XHJcbiAgICAgICAgY29uc3Qgb3BlcmF0b3IgPSBzdHJlYW0ubmV4dCgpO1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0ID0gcGFyc2VFcXVhbGl0eShzdHJlYW0pO1xyXG4gICAgICAgIGV4cHJlc3Npb24gPSBuZXcgQmluYXJ5T3Aob3BlcmF0b3IsIGV4cHJlc3Npb24sIHJpZ2h0LCB7IHRva2VuOiBleHByZXNzaW9uLnRva2VuLCBzdHJlYW0gfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXhwcmVzc2lvbjtcclxufTtcclxuIiwiaW1wb3J0IHsgQmluYXJ5T3AsIEV4cHJlc3Npb24gfSBmcm9tICcuLi9BU1QnO1xyXG5pbXBvcnQgeyBUb2tlblR5cGUgfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5cclxuaW1wb3J0IHBhcnNlTG9naWNhbEFuZCBmcm9tICcuL3BhcnNlTG9naWNhbEFuZCc7O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VMb2dpY2FsT3IoXHJcbiAgICBzdHJlYW06IFRva2VuU3RyZWFtXHJcbik6IEV4cHJlc3Npb24ge1xyXG4gICAgbGV0IGV4cHJlc3Npb24gPSBwYXJzZUxvZ2ljYWxBbmQoc3RyZWFtKTtcclxuICAgIHdoaWxlIChzdHJlYW0ucGVlaygpLnR5cGUgJiBUb2tlblR5cGUuTE9HSUNBTF9PUikge1xyXG4gICAgICAgIGNvbnN0IG9wZXJhdG9yID0gc3RyZWFtLm5leHQoKTtcclxuICAgICAgICBjb25zdCByaWdodCA9IHBhcnNlTG9naWNhbEFuZChzdHJlYW0pO1xyXG4gICAgICAgIGV4cHJlc3Npb24gPSBuZXcgQmluYXJ5T3Aob3BlcmF0b3IsIGV4cHJlc3Npb24sIHJpZ2h0LCB7IHRva2VuOiBleHByZXNzaW9uLnRva2VuLCBzdHJlYW0gfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXhwcmVzc2lvbjtcclxufTtcclxuIiwiaW1wb3J0IHsgRXhwcmVzc2lvbiwgQXNzaWdubWVudCwgVmFyaWFibGVSZWZlcmVuY2UgfSBmcm9tICcuLi9BU1QnO1xyXG5pbXBvcnQgeyBUb2tlblN0cmVhbSB9IGZyb20gJy4uL1Rva2VuU3RyZWFtJztcclxuXHJcbmltcG9ydCBwYXJzZUxvZ2ljYWxPciBmcm9tICcuL3BhcnNlTG9naWNhbE9yJzs7XHJcbmltcG9ydCB7IFRva2VuVHlwZSB9IGZyb20gJy4uL1Rva2VuJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbihcclxuICAgIHN0cmVhbTogVG9rZW5TdHJlYW1cclxuKTogRXhwcmVzc2lvbiB7XHJcbiAgICBsZXQgZXhwcmVzc2lvbjtcclxuICAgIGlmIChzdHJlYW0ucGVlaygpLnR5cGUgPT09IFRva2VuVHlwZS5JREVOVElGSUVSICYmIHN0cmVhbS5wZWVrKDEpLnR5cGUgPT09IFRva2VuVHlwZS5BU1NJR04pIHtcclxuICAgICAgICBjb25zdCBuYW1lID0gc3RyZWFtLmV4cGVjdChUb2tlblR5cGUuSURFTlRJRklFUik7XHJcbiAgICAgICAgc3RyZWFtLmV4cGVjdChUb2tlblR5cGUuQVNTSUdOKTtcclxuICAgICAgICBjb25zdCBpbm5lciA9IHBhcnNlRXhwcmVzc2lvbihzdHJlYW0pO1xyXG4gICAgICAgIGV4cHJlc3Npb24gPSBuZXcgQXNzaWdubWVudChuYW1lLmxleGVtZSwgaW5uZXIsIHsgdG9rZW46IG5hbWUsIHN0cmVhbSB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZXhwcmVzc2lvbiA9IHBhcnNlTG9naWNhbE9yKHN0cmVhbSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZXhwcmVzc2lvbjtcclxufTtcclxuIiwiaW1wb3J0IHsgUmV0dXJuU3RhdGVtZW50LCBTdGF0ZW1lbnQsIERlY2xhcmF0aW9uIH0gZnJvbSAnLi4vQVNUJztcclxuaW1wb3J0IHsgVG9rZW5UeXBlLCBUb2tlbiB9IGZyb20gJy4uL1Rva2VuJztcclxuaW1wb3J0IHsgVG9rZW5TdHJlYW0gfSBmcm9tICcuLi9Ub2tlblN0cmVhbSc7XHJcblxyXG5pbXBvcnQgcGFyc2VFeHByZXNzaW9uIGZyb20gJy4vcGFyc2VFeHByZXNzaW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlU3RhdGVtZW50KFxyXG4gICAgc3RyZWFtOiBUb2tlblN0cmVhbVxyXG4pOiBTdGF0ZW1lbnQge1xyXG4gICAgLy8gY3JlYXRlIGEgcGhvbnkgc3RhdGVtZW50IHRvIGtlZXAgdGhlIGNvbXBpbGVyIGhhcHB5XHJcbiAgICBsZXQgc3RhdGVtZW50OiBTdGF0ZW1lbnQgPSBuZXcgU3RhdGVtZW50KHsgdG9rZW46IG5ldyBUb2tlbihUb2tlblR5cGUuVU5LT1dOLCAnW3Bob255XScpIH0pO1xyXG4gICAgY29uc3QgcGVlayA9IHN0cmVhbS5wZWVrKCk7XHJcbiAgICBpZiAocGVlay50eXBlID09PSBUb2tlblR5cGUuS0VZV09SRCkge1xyXG4gICAgICAgIGlmIChwZWVrLmxleGVtZSA9PT0gJ2ludCcpIHtcclxuICAgICAgICAgICAgY29uc3QgdHlwZSA9IHN0cmVhbS5uZXh0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBzdHJlYW0uZXhwZWN0KFRva2VuVHlwZS5JREVOVElGSUVSKTtcclxuICAgICAgICAgICAgbGV0IGV4cHJlc3Npb247XHJcbiAgICAgICAgICAgIGlmIChzdHJlYW0ucGVlaygpLnR5cGUgIT09IFRva2VuVHlwZS5TRU1JX0NPTE9OKSB7XHJcbiAgICAgICAgICAgICAgICBzdHJlYW0uZXhwZWN0KFRva2VuVHlwZS5BU1NJR04pO1xyXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbiA9IHBhcnNlRXhwcmVzc2lvbihzdHJlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN0YXRlbWVudCA9IG5ldyBEZWNsYXJhdGlvbihuYW1lLmxleGVtZSwgZXhwcmVzc2lvbiwgeyB0b2tlbjogbmFtZSwgc3RyZWFtIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGVlay5sZXhlbWUgPT09ICdyZXR1cm4nKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnN1bWUgJ3JldHVybidcclxuICAgICAgICAgICAgc3RyZWFtLm5leHQoKTtcclxuICAgICAgICAgICAgY29uc3QgZXhwcmVzc2lvbiA9IHBhcnNlRXhwcmVzc2lvbihzdHJlYW0pO1xyXG4gICAgICAgICAgICBzdGF0ZW1lbnQgPSBuZXcgUmV0dXJuU3RhdGVtZW50KGV4cHJlc3Npb24sIHsgdG9rZW46IHBlZWssIHN0cmVhbSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdHJlYW0ucGFuaWMocGVlaywgYGtleXdvcmQgJ2ludCd8J3JldHVybidgKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXRlbWVudCA9IHBhcnNlRXhwcmVzc2lvbihzdHJlYW0pO1xyXG4gICAgfVxyXG4gICAgc3RyZWFtLmV4cGVjdChUb2tlblR5cGUuU0VNSV9DT0xPTik7XHJcbiAgICByZXR1cm4gc3RhdGVtZW50O1xyXG59O1xyXG4iLCJpbXBvcnQgeyBGdW5jdGlvbkRlY2xhcmF0aW9uLCBTdGF0ZW1lbnQgfSBmcm9tICcuLi9BU1QnO1xyXG5pbXBvcnQgeyBJVG9rZW4sIFRva2VuLCBUb2tlblR5cGUgfSBmcm9tICcuLi9Ub2tlbic7XHJcbmltcG9ydCB7IFRva2VuU3RyZWFtIH0gZnJvbSAnLi4vVG9rZW5TdHJlYW0nO1xyXG5cclxuaW1wb3J0IHBhcnNlU3RhdGVtZW50IGZyb20gJy4vcGFyc2VTdGF0ZW1lbnQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uKFxyXG4gICAgc3RyZWFtOiBUb2tlblN0cmVhbVxyXG4pOiBGdW5jdGlvbkRlY2xhcmF0aW9uIHtcclxuICAgIGNvbnN0IHR5cGUgPSBzdHJlYW0uZXhwZWN0KFRva2VuVHlwZS5LRVlXT1JEIHwgVG9rZW5UeXBlLklERU5USUZJRVIpO1xyXG4gICAgY29uc3QgaWRlbnRpZmllciA9IHN0cmVhbS5leHBlY3QoVG9rZW5UeXBlLklERU5USUZJRVIpO1xyXG4gICAgc3RyZWFtLmV4cGVjdChUb2tlblR5cGUuTEVGVF9QQVJFTik7XHJcbiAgICAvLyBpZ25vcmUgYXJndW1lbnQgbGlzdFxyXG4gICAgd2hpbGUgKCFzdHJlYW0uZW9mICYmIHN0cmVhbS5wZWVrKCkudHlwZSAhPT0gVG9rZW5UeXBlLlJJR0hUX1BBUkVOKSB7XHJcbiAgICAgICAgc3RyZWFtLm5leHQoKTtcclxuICAgIH1cclxuICAgIHN0cmVhbS5leHBlY3QoVG9rZW5UeXBlLlJJR0hUX1BBUkVOKTtcclxuICAgIHN0cmVhbS5leHBlY3QoVG9rZW5UeXBlLkxFRlRfQlJBQ0UpO1xyXG5cclxuICAgIGNvbnN0IHN0YXRlbWVudHM6IFN0YXRlbWVudFtdID0gW107XHJcbiAgICB3aGlsZSAoc3RyZWFtLnBlZWsoKS50eXBlICE9PSBUb2tlblR5cGUuUklHSFRfQlJBQ0UpIHtcclxuICAgICAgICBjb25zdCBzdGF0ZW1lbnQgPSBwYXJzZVN0YXRlbWVudChzdHJlYW0pO1xyXG4gICAgICAgIHN0YXRlbWVudHMucHVzaChzdGF0ZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgc3RyZWFtLmV4cGVjdChUb2tlblR5cGUuUklHSFRfQlJBQ0UpO1xyXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbkRlY2xhcmF0aW9uKHR5cGUubGV4ZW1lLCBpZGVudGlmaWVyLmxleGVtZSwgc3RhdGVtZW50cywgeyB0b2tlbjogdHlwZSwgc3RyZWFtIH0pO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBQcm9ncmFtIH0gZnJvbSAnLi4vQVNUJztcclxuaW1wb3J0IHsgVG9rZW5TdHJlYW0gfSBmcm9tICcuLi9Ub2tlblN0cmVhbSc7XHJcblxyXG5pbXBvcnQgcGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uIGZyb20gJy4vcGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlUHJvZ3JhbShcclxuICAgIHN0cmVhbTogVG9rZW5TdHJlYW1cclxuKTogUHJvZ3JhbSB7XHJcbiAgICBjb25zdCBmdW5jdGlvbnMgPSBbXTtcclxuICAgIHdoaWxlICghc3RyZWFtLmVvZikge1xyXG4gICAgICAgIGZ1bmN0aW9ucy5wdXNoKFxyXG4gICAgICAgICAgICBwYXJzZUZ1bmN0aW9uRGVjbGFyYXRpb24oc3RyZWFtKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBQcm9ncmFtKGZ1bmN0aW9ucywgeyB0b2tlbjogZnVuY3Rpb25zWzBdLnRva2VuIHx8IHN0cmVhbS5FT0ZUb2tlbiwgc3RyZWFtIH0pO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBJTm9kZSB9IGZyb20gJy4uL0FTVCc7XHJcbmltcG9ydCB7IElUb2tlbiB9IGZyb20gJy4uL1Rva2VuJztcclxuaW1wb3J0IHsgVG9rZW5TdHJlYW0gfSBmcm9tICcuLi9Ub2tlblN0cmVhbSc7XHJcblxyXG5pbXBvcnQgcGFyc2VQcm9ncmFtIGZyb20gJy4vcGFyc2VQcm9ncmFtJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBhcnNlKHN0cmVhbTogSVRva2VuW10gfCBUb2tlblN0cmVhbSk6IElOb2RlIHtcclxuICAgIHN0cmVhbSA9ICEoc3RyZWFtIGluc3RhbmNlb2YgVG9rZW5TdHJlYW0pID8gbmV3IFRva2VuU3RyZWFtKHN0cmVhbSkgOiBzdHJlYW07XHJcbiAgICByZXR1cm4gcGFyc2VQcm9ncmFtKHN0cmVhbSk7XHJcbn1cclxuIiwiaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UnO1xyXG5cclxuLypcclxuPHByb2dyYW0+IDo6PSA8ZnVuY3Rpb24+XHJcbjxmdW5jdGlvbj4gOjo9IFwiaW50XCIgPGlkPiBcIihcIiBcIilcIiBcIntcIiA8c3RhdGVtZW50PiBcIn1cIlxyXG48c3RhdGVtZW50PiA6Oj0gXCJyZXR1cm5cIiA8ZXhwPiBcIjtcIlxyXG48ZXhwPiA6Oj0gPGxvZ2ljYWwtYW5kLWV4cD4geyBcInx8XCIgPGxvZ2ljYWwtYW5kLWV4cD4gfVxyXG48bG9naWNhbC1hbmQtZXhwPiA6Oj0gPGVxdWFsaXR5LWV4cD4geyBcIiYmXCIgPGVxdWFsaXR5LWV4cD4gfVxyXG48ZXF1YWxpdHktZXhwPiA6Oj0gPHJlbGF0aW9uYWwtZXhwPiB7IChcIiE9XCIgfCBcIj09XCIpIDxyZWxhdGlvbmFsLWV4cD4gfVxyXG48cmVsYXRpb25hbC1leHA+IDo6PSA8YWRkaXRpdmUtZXhwPiB7IChcIjxcIiB8IFwiPlwiIHwgXCI8PVwiIHwgXCI+PVwiKSA8YWRkaXRpdmUtZXhwPiB9XHJcbjxhZGRpdGl2ZS1leHA+IDo6PSA8dGVybT4geyAoXCIrXCIgfCBcIi1cIikgPHRlcm0+IH1cclxuPHRlcm0+IDo6PSA8ZmFjdG9yPiB7IChcIipcIiB8IFwiL1wiKSA8ZmFjdG9yPiB9XHJcbjxmYWN0b3I+IDo6PSBcIihcIiA8ZXhwPiBcIilcIiB8IDx1bmFyeV9vcD4gPGZhY3Rvcj4gfCA8aW50PlxyXG48dW5hcnlfb3A+IDo6PSBcIiFcIiB8IFwiflwiIHwgXCItXCJcclxuKi9cclxuXHJcbmltcG9ydCBwYXJzZVByb2dyYW0gZnJvbSAnLi9wYXJzZVByb2dyYW0nO1xyXG5pbXBvcnQgcGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uIGZyb20gJy4vcGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uJztcclxuaW1wb3J0IHBhcnNlU3RhdGVtZW50IGZyb20gJy4vcGFyc2VTdGF0ZW1lbnQnO1xyXG5cclxuaW1wb3J0IHBhcnNlRXhwcmVzc2lvbiBmcm9tICcuL3BhcnNlRXhwcmVzc2lvbic7XHJcbmltcG9ydCBwYXJzZUxvZ2ljYWxPciBmcm9tICcuL3BhcnNlTG9naWNhbE9yJztcclxuaW1wb3J0IHBhcnNlTG9naWNhbEFuZCBmcm9tICcuL3BhcnNlTG9naWNhbEFuZCc7XHJcbmltcG9ydCBwYXJzZUVxdWFsaXR5IGZyb20gJy4vcGFyc2VFcXVhbGl0eSc7XHJcbmltcG9ydCBwYXJzZVJlbGF0aW9uYWwgZnJvbSAnLi9wYXJzZVJlbGF0aW9uYWwnO1xyXG5pbXBvcnQgcGFyc2VBZGRpdGl2ZSBmcm9tICcuL3BhcnNlQWRkaXRpdmUnO1xyXG5cclxuaW1wb3J0IHBhcnNlVGVybSBmcm9tICcuL3BhcnNlVGVybSc7XHJcbmltcG9ydCBwYXJzZUZhY3RvciBmcm9tICcuL3BhcnNlRmFjdG9yJztcclxuXHJcblxyXG5leHBvcnQge1xyXG4gICAgcGFyc2UsXHJcblxyXG4gICAgcGFyc2VQcm9ncmFtLFxyXG4gICAgcGFyc2VGdW5jdGlvbkRlY2xhcmF0aW9uLFxyXG4gICAgcGFyc2VTdGF0ZW1lbnQsXHJcbiAgICBcclxuICAgIHBhcnNlRXhwcmVzc2lvbixcclxuICAgIHBhcnNlTG9naWNhbE9yLFxyXG4gICAgcGFyc2VMb2dpY2FsQW5kLFxyXG4gICAgcGFyc2VFcXVhbGl0eSxcclxuICAgIHBhcnNlUmVsYXRpb25hbCxcclxuICAgIHBhcnNlQWRkaXRpdmUsXHJcblxyXG4gICAgcGFyc2VUZXJtLFxyXG4gICAgcGFyc2VGYWN0b3IsXHJcbn1cclxuIl19