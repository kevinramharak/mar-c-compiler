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
        TokenType[TokenType["SEMI_COLON"] = bit(5)] = "SEMI_COLON";
        TokenType[TokenType["NEGATION"] = bit(6)] = "NEGATION";
        TokenType[TokenType["ADDITION"] = bit(7)] = "ADDITION";
        TokenType[TokenType["MULTIPLICATION"] = bit(8)] = "MULTIPLICATION";
        TokenType[TokenType["DIVISION"] = bit(9)] = "DIVISION";
        TokenType[TokenType["BITWISE_COMPLEMENT"] = bit(10)] = "BITWISE_COMPLEMENT";
        TokenType[TokenType["LOGICAL_NOT"] = bit(11)] = "LOGICAL_NOT";
        TokenType[TokenType["LOGICAL_AND"] = bit(12)] = "LOGICAL_AND";
        TokenType[TokenType["LOGICAL_OR"] = bit(13)] = "LOGICAL_OR";
        TokenType[TokenType["KEYWORD"] = bit(14)] = "KEYWORD";
        TokenType[TokenType["IDENTIFIER"] = bit(15)] = "IDENTIFIER";
        TokenType[TokenType["INTEGER_LITERAL"] = bit(16)] = "INTEGER_LITERAL";
        // helper types - represents multiple types
        TokenType[TokenType["UNARY_OP"] = TokenType.BITWISE_COMPLEMENT | TokenType.NEGATION | TokenType.LOGICAL_NOT] = "UNARY_OP";
        TokenType[TokenType["BINARY_OP"] = TokenType.NEGATION | TokenType.ADDITION | TokenType.MULTIPLICATION | TokenType.DIVISION] = "BINARY_OP";
    })(TokenType || (TokenType = {}));
    ;
    exports.default = TokenType;
});
define("Token/IToken", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("StringStream/EOFError", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EOFError extends Error {
        constructor(...args) {
            super(...args);
        }
    }
    exports.default = EOFError;
});
define("StringStream/StringStream", ["require", "exports", "eventemitter3", "StringStream/EOFError"], function (require, exports, eventemitter3_1, EOFError_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    eventemitter3_1 = __importDefault(eventemitter3_1);
    EOFError_1 = __importDefault(EOFError_1);
    class StringStream {
        /**
         *
         * @param input Input string to provide stream like interface for
         */
        constructor(input) {
            this.input = input;
            this.emitter = new eventemitter3_1.default();
            this._index = 0;
        }
        get index() {
            return this._index;
        }
        /**
         * Prevents index from being larger than input length
         *
         * @private
         * @memberof StringStream
         */
        set index(value) {
            this._index = value;
            if (this._index > this.input.length) {
                this.emitter.emit('indexOverflow');
                this._index = this.input.length;
            }
        }
        /**
         * Represents end of stream flag
         */
        get eof() {
            return this.index === this.input.length;
        }
        /**
         * Peek `length` amount of characters and return them as a string
         * @throws {EOFError}
         * @param length
         * @param [noThrow] suppress EOFError
         */
        peek(length = 1, noThrow = false) {
            if (!noThrow) {
                this.checkEOFError(length);
            }
            const substr = this.input.substr(this.index, length);
            this.emitter.emit('peek', substr);
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
            const substr = this.input.substr(this.index, length);
            this.index += length;
            this.emitter.emit('next', substr);
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
            if (this.index + length > this.input.length) {
                const error = new EOFError_1.default(`#StringStream.next(${length}) - exceeded end of file`);
                this.emitter.emit('EOFError', error);
                throw error;
            }
        }
    }
    exports.default = StringStream;
});
define("StringStream/index", ["require", "exports", "StringStream/EOFError", "StringStream/StringStream"], function (require, exports, EOFError_2, StringStream_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    EOFError_2 = __importDefault(EOFError_2);
    StringStream_1 = __importDefault(StringStream_1);
    exports.EOFError = EOFError_2.default;
    exports.StringStream = StringStream_1.default;
});
define("FileInfo/IFileInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("FileInfo/FileInfo", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FileInfo {
        constructor(stream, name = '[anonymous]') {
            this.stream = stream;
            this.name = name;
            this._line = 1;
            this._col = 1;
            stream.emitter.on('next', this.nextHandler.bind(this));
        }
        get line() {
            return this._line;
        }
        get col() {
            return this._col;
        }
        nextHandler(substr) {
            let index = 0;
            while (index < substr.length) {
                switch (substr[index++]) {
                    case '\r':
                        // for now ignore '\r' entirely
                        break;
                    case '\n':
                        this._line++;
                        this._col = 1;
                        break;
                    default:
                        this._col++;
                        break;
                }
            }
        }
    }
    exports.default = FileInfo;
});
define("FileInfo/index", ["require", "exports", "FileInfo/FileInfo"], function (require, exports, FileInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    FileInfo_1 = __importDefault(FileInfo_1);
    exports.FileInfo = FileInfo_1.default;
});
define("Token/Token", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    //import { inspect } from '../node';
    class Token {
        constructor(type, lexeme, info) {
            this.type = type;
            this.lexeme = lexeme;
            this.file = info.name;
            this.line = info.line;
            this.col = info.col;
        }
    }
    exports.default = Token;
});
define("Token/index", ["require", "exports", "Token/Token", "Token/TokenType"], function (require, exports, Token_1, TokenType_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Token_1 = __importDefault(Token_1);
    TokenType_1 = __importDefault(TokenType_1);
    exports.Token = Token_1.default;
    exports.TokenType = TokenType_1.default;
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
define("TokenStream/ParseError", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParseError extends Error {
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
        peek() {
            return this.tokens[this.index] || this.EOFToken;
        }
        next() {
            return this.tokens[this.index++] || this.EOFToken;
        }
        expect(type, message) {
            const token = this.peek();
            if (token.type & type) {
                return this.next();
            }
            else {
                this.panic(token, (message) ? message : type);
            }
            // to keep the typescript compiler happy
            return token;
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
                return 'given token does not exists in stream';
            }
            // gather all tokens up to 2 lines before the passed token
            const lines = [token.line - 1, token.line - 2, token.line].filter(line => line > 0);
            const output = lines.map((line) => {
                return `${line}|  ` + this.tokens.filter((token) => token.line === line).reduce((str, token) => {
                    const indent = (token.col - 1) - str.length;
                    return str + ' '.repeat((indent >= 0) ? indent : 0) + token.lexeme;
                }, '');
            });
            // insert big arrow to faulty token
            const prefix = ' '.repeat(token.line.toString().length) + '   ';
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
    TokenStream_1 = __importDefault(TokenStream_1);
    exports.TokenStream = TokenStream_1.default;
});
define("AST/INode", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("AST/Node", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Node {
        constructor(info = {}) {
            this.children = [];
            this.token = info.token;
            this.stream = info.stream;
        }
        get [Symbol.toStringTag]() {
            return 'Node';
        }
        friendlyError(message) {
            if (!this.stream || !this.token) {
                return message;
            }
            return this.stream.friendlyError(this.token, message);
        }
    }
    exports.default = Node;
});
define("AST/Expression", ["require", "exports", "AST/Node"], function (require, exports, Node_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Node_1 = __importDefault(Node_1);
    class Expression extends Node_1.default {
        constructor(info = {}) {
            super(info);
        }
        get [Symbol.toStringTag]() {
            return 'Expression';
        }
    }
    exports.default = Expression;
});
define("AST/BinaryOp", ["require", "exports", "AST/Expression"], function (require, exports, Expression_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Expression_1 = __importDefault(Expression_1);
    class BinaryOp extends Expression_1.default {
        constructor(operator, left, right, info = {}) {
            super(info);
            this.operator = operator;
            this.left = left;
            this.right = right;
            this.children = [left, right];
        }
        get [Symbol.toStringTag]() {
            return 'BinaryOp';
        }
    }
    exports.default = BinaryOp;
});
define("AST/IConstant", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("AST/Constant", ["require", "exports", "AST/Node"], function (require, exports, Node_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Node_2 = __importDefault(Node_2);
    class Constant extends Node_2.default {
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
define("AST/Statement", ["require", "exports", "AST/Node"], function (require, exports, Node_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Node_3 = __importDefault(Node_3);
    class Statement extends Node_3.default {
        constructor(info = {}) {
            super(info);
        }
        get [Symbol.toStringTag]() {
            return 'Statement';
        }
    }
    exports.default = Statement;
});
define("AST/FunctionDeclaration", ["require", "exports", "AST/Node"], function (require, exports, Node_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Node_4 = __importDefault(Node_4);
    class FunctionDeclaration extends Node_4.default {
        constructor(type, name, statement, info = {}) {
            super(info);
            this.type = type;
            this.name = name;
            this.statement = statement;
            this.children = [statement];
        }
        get [Symbol.toStringTag]() {
            return 'FunctionDeclaration';
        }
    }
    exports.default = FunctionDeclaration;
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
define("AST/Program", ["require", "exports", "AST/Node"], function (require, exports, Node_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Node_5 = __importDefault(Node_5);
    class Program extends Node_5.default {
        constructor(declaration, info = {}) {
            super(info);
            this.declaration = declaration;
            this.children = [declaration];
        }
        get [Symbol.toStringTag]() {
            return 'Program';
        }
    }
    exports.default = Program;
});
define("AST/ReturnStatement", ["require", "exports", "AST/Statement"], function (require, exports, Statement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Statement_1 = __importDefault(Statement_1);
    class ReturnStatement extends Statement_1.default {
        constructor(expression, info = {}) {
            super(info);
            this.expression = expression;
            this.children = [expression];
        }
        get [Symbol.toStringTag]() {
            return 'ReturnStatement';
        }
    }
    exports.default = ReturnStatement;
});
define("AST/UnaryOp", ["require", "exports", "AST/Expression"], function (require, exports, Expression_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Expression_2 = __importDefault(Expression_2);
    class UnaryOp extends Expression_2.default {
        constructor(operator, expression, info = {}) {
            super(info);
            this.operator = operator;
            this.expression = expression;
            this.children = [expression];
        }
        get [Symbol.toStringTag]() {
            return 'UnaryOp';
        }
    }
    exports.default = UnaryOp;
});
define("AST/index", ["require", "exports", "AST/BinaryOp", "AST/Constant", "AST/IntegerConstant", "AST/Expression", "AST/FunctionDeclaration", "AST/Node", "AST/Program", "AST/ReturnStatement", "AST/UnaryOp", "AST/Statement"], function (require, exports, BinaryOp_1, Constant_2, IntegerConstant_1, Expression_3, FunctionDeclaration_1, Node_6, Program_1, ReturnStatement_1, UnaryOp_1, Statement_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    BinaryOp_1 = __importDefault(BinaryOp_1);
    Constant_2 = __importDefault(Constant_2);
    IntegerConstant_1 = __importDefault(IntegerConstant_1);
    Expression_3 = __importDefault(Expression_3);
    FunctionDeclaration_1 = __importDefault(FunctionDeclaration_1);
    Node_6 = __importDefault(Node_6);
    Program_1 = __importDefault(Program_1);
    ReturnStatement_1 = __importDefault(ReturnStatement_1);
    UnaryOp_1 = __importDefault(UnaryOp_1);
    Statement_2 = __importDefault(Statement_2);
    exports.BinaryOp = BinaryOp_1.default;
    exports.Constant = Constant_2.default;
    exports.IntegerConstant = IntegerConstant_1.default;
    exports.Expression = Expression_3.default;
    exports.FunctionDeclaration = FunctionDeclaration_1.default;
    exports.Node = Node_6.default;
    exports.Program = Program_1.default;
    exports.ReturnStatement = ReturnStatement_1.default;
    exports.UnaryOp = UnaryOp_1.default;
    exports.Statement = Statement_2.default;
});
define("Generator/Visitor", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Visitor {
        constructor() {
        }
        visit(node, ...args) {
            const type = Object.prototype.toString.call(node).slice(8, -1);
            const visitor = this['visit' + type];
            if (typeof visitor !== 'undefined') {
                return visitor.call(this, node, ...args);
            }
            else {
                return node.children.map(this.visit.bind(this));
            }
        }
    }
    exports.default = Visitor;
});
define("Generator/CodeGenVisitor", ["require", "exports", "Generator/Visitor"], function (require, exports, Visitor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Visitor_1 = __importDefault(Visitor_1);
    class CodeGenVisitor extends Visitor_1.default {
        constructor() {
            super();
        }
        visitProgram(node) {
            return this.visit(node.declaration);
        }
        visitFunctionDeclaration(node) {
            return `\
${node.name}:
` + this.visit(node.statement);
        }
        // no ret but brk if function is main, or some custom exit function to wrap the brk instruction
        visitReturnStatement(node) {
            return this.visit(node.expression) + `\
  ret
`;
        }
        visitBinaryOp(node) {
            let asm = this.visit(node.left);
            asm += '  PUSH A\n';
            asm += this.visit(node.right);
            asm += '  POP B\n';
            switch (node.operator) {
                case '*':
                    asm += '  MUL B';
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
            return asm;
        }
        visitUnaryOp(node) {
            return this.visit(node.expression) + `\
  NEG A
`;
        }
        visitConstant(node) {
            return this.visitIntegerConstant(node);
        }
        visitIntegerConstant(node) {
            return `\
  MOV A, ${node.value}
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
        return new CodeGenVisitor_1.default().visit(ast);
    }
    exports.default = generate;
});
define("Generator/index", ["require", "exports", "Generator/generate"], function (require, exports, generate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    generate_1 = __importDefault(generate_1);
    exports.generate = generate_1.default;
});
define("Lexer/keywords", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const keywords = [
        'int',
        'return'
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
    };
    exports.default = is;
});
define("Lexer/lex", ["require", "exports", "Lexer/is", "FileInfo/index", "StringStream/index", "Token/index"], function (require, exports, is_1, FileInfo_2, StringStream_2, Token_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    is_1 = __importDefault(is_1);
    function lex(stream, filename) {
        stream = (typeof stream === 'string') ? new StringStream_2.StringStream(stream) : stream;
        const tokens = [];
        const info = new FileInfo_2.FileInfo(stream, filename);
        // tslint:disable-next-line no-shadowed-variable
        const tokenHelper = (type, lexeme, info) => new Token_4.Token(type, lexeme, info);
        lexing: while (!stream.eof) {
            const currentInfo = { name: info.name, line: info.line, col: info.col };
            const tokify = (type, lexeme) => tokens.push(tokenHelper(type, lexeme, currentInfo));
            const c = stream.next();
            // ignore whitespace
            switch (c) {
                case '\r':
                case '\n':
                case '\t':
                case '\v':
                case ' ':
                    continue lexing;
            }
            // one letter punctuation
            switch (c) {
                case '{':
                    tokify(Token_4.TokenType.LEFT_BRACE, c);
                    continue lexing;
                case '}':
                    tokify(Token_4.TokenType.RIGHT_BRACE, c);
                    continue lexing;
                case '(':
                    tokify(Token_4.TokenType.LEFT_PAREN, c);
                    continue lexing;
                case ')':
                    tokify(Token_4.TokenType.RIGHT_PAREN, c);
                    continue lexing;
                case ';':
                    tokify(Token_4.TokenType.SEMI_COLON, c);
                    continue lexing;
                case '~':
                    tokify(Token_4.TokenType.BITWISE_COMPLEMENT, c);
                    continue lexing;
            }
            // multiple letter punctuation
            switch (c) {
                case '-':
                    tokify(Token_4.TokenType.NEGATION, c);
                    continue lexing;
                case '!':
                    tokify(Token_4.TokenType.LOGICAL_NOT, c);
                    continue lexing;
                case '+':
                    tokify(Token_4.TokenType.ADDITION, c);
                    continue lexing;
                case '*':
                    tokify(Token_4.TokenType.MULTIPLICATION, c);
                    continue lexing;
                case '/':
                    tokify(Token_4.TokenType.DIVISION, c);
                    continue lexing;
            }
            // integer literal: https://en.cppreference.com/w/c/language/integer_constant
            // TODO: refactor to a function, also put 'ull' suffixes logic in that function
            if (is_1.default.decimal(c)) {
                tokify(Token_4.TokenType.INTEGER_LITERAL, c + stream.while(is_1.default.digit));
                continue lexing;
            }
            if (c === '0') {
                const peek = (!stream.eof) ? stream.peek() : false;
                // hex
                if (peek && (peek === 'x' || peek === 'X')) {
                    const x = stream.next();
                    tokify(Token_4.TokenType.INTEGER_LITERAL, c + x + stream.while(is_1.default.hex));
                }
                // octal
                else {
                    tokify(Token_4.TokenType.INTEGER_LITERAL, c + stream.while(is_1.default.octal));
                }
                continue lexing;
            }
            // identifiers and keywords
            if (is_1.default.identifierStart(c)) {
                const lexeme = c + stream.while(is_1.default.identifier);
                const type = (is_1.default.keyword(lexeme)) ? Token_4.TokenType.KEYWORD : Token_4.TokenType.IDENTIFIER;
                tokify(type, lexeme);
                continue lexing;
            }
        }
        return tokens;
    }
    exports.default = lex;
    ;
});
define("Lexer/index", ["require", "exports", "Lexer/is", "Lexer/keywords", "Lexer/lex"], function (require, exports, is_2, keywords_2, lex_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    is_2 = __importDefault(is_2);
    keywords_2 = __importDefault(keywords_2);
    lex_1 = __importDefault(lex_1);
    exports.is = is_2.default;
    exports.keywords = keywords_2.default;
    exports.lex = lex_1.default;
});
define("Parser/parseFactor", ["require", "exports", "AST/index", "Token/index", "Parser/parseExpression"], function (require, exports, AST_1, Token_5, parseExpression_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseExpression_1 = __importDefault(parseExpression_1);
    function parseFactor(stream) {
        const peek = stream.peek();
        if (peek.type === Token_5.TokenType.LEFT_PAREN) {
            stream.next();
            const expression = parseExpression_1.default(stream);
            stream.expect(Token_5.TokenType.RIGHT_PAREN);
            return new AST_1.Expression(expression);
        }
        else if (peek.type & Token_5.TokenType.UNARY_OP) {
            const unaryOp = stream.next();
            const factor = parseFactor(stream);
            return new AST_1.UnaryOp(unaryOp.lexeme, factor);
        }
        else {
            const constant = stream.expect(Token_5.TokenType.INTEGER_LITERAL);
            return new AST_1.IntegerConstant(Number.parseInt(constant.lexeme));
        }
    }
    exports.default = parseFactor;
    ;
});
define("Parser/parseTerm", ["require", "exports", "AST/index", "Token/index", "Parser/parseFactor"], function (require, exports, AST_2, Token_6, parseFactor_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseFactor_1 = __importDefault(parseFactor_1);
    function parseTerm(stream) {
        let factor = parseFactor_1.default(stream);
        while (stream.peek().type & (Token_6.TokenType.MULTIPLICATION | Token_6.TokenType.DIVISION)) {
            const operator = stream.next();
            const right = parseFactor_1.default(stream);
            factor = new AST_2.BinaryOp(operator.lexeme, factor, right);
        }
        return factor;
    }
    exports.default = parseTerm;
    ;
});
define("Parser/parseExpression", ["require", "exports", "AST/index", "Token/index", "Parser/parseTerm"], function (require, exports, AST_3, Token_7, parseTerm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseTerm_1 = __importDefault(parseTerm_1);
    function parseExpression(stream) {
        let term = parseTerm_1.default(stream);
        while (stream.peek().type & (Token_7.TokenType.ADDITION | Token_7.TokenType.NEGATION)) {
            const operator = stream.next();
            const right = parseTerm_1.default(stream);
            term = new AST_3.BinaryOp(operator.lexeme, term, right);
        }
        return term;
    }
    exports.default = parseExpression;
    ;
});
define("Parser/parseStatement", ["require", "exports", "AST/index", "Token/index", "Parser/parseExpression"], function (require, exports, AST_4, Token_8, parseExpression_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseExpression_2 = __importDefault(parseExpression_2);
    function parseStatement(stream) {
        const keyword = stream.expect(Token_8.TokenType.KEYWORD);
        if (keyword.lexeme !== 'return') {
            stream.panic(keyword, 'return');
        }
        const expression = parseExpression_2.default(stream);
        stream.expect(Token_8.TokenType.SEMI_COLON);
        return new AST_4.ReturnStatement(expression);
    }
    exports.default = parseStatement;
    ;
});
define("Parser/parseFunctionDeclaration", ["require", "exports", "AST/index", "Token/index", "Parser/parseStatement"], function (require, exports, AST_5, Token_9, parseStatement_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseStatement_1 = __importDefault(parseStatement_1);
    function parseFunctionDeclaration(stream) {
        const type = stream.expect(Token_9.TokenType.KEYWORD | Token_9.TokenType.IDENTIFIER);
        const identifier = stream.expect(Token_9.TokenType.IDENTIFIER);
        stream.expect(Token_9.TokenType.LEFT_PAREN);
        stream.expect(Token_9.TokenType.RIGHT_PAREN);
        stream.expect(Token_9.TokenType.LEFT_BRACE);
        const statement = parseStatement_1.default(stream);
        stream.expect(Token_9.TokenType.RIGHT_BRACE);
        return new AST_5.FunctionDeclaration(type.lexeme, identifier.lexeme, statement, { token: type, stream });
    }
    exports.default = parseFunctionDeclaration;
    ;
});
define("Parser/parseProgram", ["require", "exports", "AST/index", "Parser/parseFunctionDeclaration"], function (require, exports, AST_6, parseFunctionDeclaration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseFunctionDeclaration_1 = __importDefault(parseFunctionDeclaration_1);
    function parseProgram(stream) {
        const func = parseFunctionDeclaration_1.default(stream);
        return new AST_6.Program(func);
    }
    exports.default = parseProgram;
    ;
});
define("Parser/parse", ["require", "exports", "TokenStream/index", "Parser/parseProgram"], function (require, exports, TokenStream_2, parseProgram_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parseProgram_1 = __importDefault(parseProgram_1);
    function parse(stream) {
        stream = Array.isArray(stream) ? new TokenStream_2.TokenStream(stream) : stream;
        return parseProgram_1.default(stream);
    }
    exports.default = parse;
});
define("Parser/index", ["require", "exports", "Parser/parse"], function (require, exports, parse_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    parse_1 = __importDefault(parse_1);
    exports.parse = parse_1.default;
});
//# sourceMappingURL=bundle.js.map