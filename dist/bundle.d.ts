declare module "Token/TokenType" {
    enum TokenType {
        EOF = 0,
        UNKOWN,
        LEFT_BRACE,
        RIGHT_BRACE,
        LEFT_PAREN,
        RIGHT_PAREN,
        SEMI_COLON,
        COLON,
        QUESTION_MARK,
        NEGATION,
        ADDITION,
        MULTIPLICATION,
        DIVISION,
        MODULO,
        BITWISE_NOT,
        BITWISE_OR,
        BITWISE_AND,
        BITWISE_XOR,
        LOGICAL_NOT,
        LOGICAL_AND,
        LOGICAL_OR,
        ASSIGN,
        EQUALS,
        NOT_EQUALS,
        LESS_THAN,
        LESS_OR_EQUALS,
        GREATER_THAN,
        GREATER_OR_EQUALS,
        KEYWORD,
        IDENTIFIER,
        INTEGER_LITERAL,
        FLOAT_LITERAL,
        UNARY_OP,
        ADDITIVE,
        TERM,
        RELATIONAL,
        EQUALITY,
        BINARY_OP
    }
    export default TokenType;
}
declare module "Token/IToken" {
    import TokenType from "Token/TokenType";
    export default interface IToken {
        lexeme: string;
        type: TokenType;
        file: string;
        line: number;
        col: number;
    }
}
declare module "Error/CompilerError" {
    export default class CompilerError extends Error {
        constructor(message?: string);
    }
}
declare module "Error/index" {
    import CompilerError from "Error/CompilerError";
    export { CompilerError, };
}
declare module "StringStream/EOFError" {
    import { CompilerError } from "Error/index";
    export default class EOFError extends CompilerError {
        constructor(...args: any[]);
    }
}
declare module "StringStream/StringStream" {
    import EventEmitter from 'eventemitter3';
    export default class StringStream {
        readonly input: string;
        /**
        * Prevents index from being larger than input length
        *
        * @private
        * @memberof StringStream
        */
        private index;
        /**
         * Represents end of stream flag
         */
        readonly eof: boolean;
        readonly emitter: EventEmitter<string | symbol>;
        private _index;
        /**
         *
         * @param input Input string to provide stream like interface for
         */
        constructor(input: string);
        /**
         * Peek `length` amount of characters and return them as a string
         * @throws {EOFError}
         * @param length
         * @param [noThrow] suppress EOFError
         */
        peek(length?: number, noThrow?: boolean): string;
        /**
         * Consume `length` amount of characters and return them as a string
         * @param length
         * @param noThrow suppress EOFError
         */
        next(length?: number, noThrow?: boolean): string;
        /**
         * Consume characters as long as the condition callback returns true
         * @param condition callback function to determince if more characters should be consumed
         */
        while(condition: (c: string, index?: number) => boolean): string;
        /**
         * @throws {EOFError}
         * @param length
         */
        private checkEOFError;
    }
}
declare module "StringStream/index" {
    import EOFError from "StringStream/EOFError";
    import StringStream from "StringStream/StringStream";
    export { EOFError, StringStream, };
}
declare module "FileInfo/IFileInfo" {
    export default interface IFileInfo {
        name: string;
        line: number;
        col: number;
    }
}
declare module "FileInfo/FileInfo" {
    import { StringStream } from "StringStream/index";
    import IFileInfo from "FileInfo/IFileInfo";
    export default class FileInfo implements IFileInfo {
        readonly stream: StringStream;
        readonly name: string;
        private _line;
        private _col;
        readonly line: number;
        readonly col: number;
        constructor(stream: StringStream, name?: string);
        private nextHandler;
    }
}
declare module "FileInfo/index" {
    import FileInfo from "FileInfo/FileInfo";
    import IFileInfo from "FileInfo/IFileInfo";
    export { FileInfo, IFileInfo };
}
declare module "Token/Token" {
    import { IFileInfo } from "FileInfo/index";
    import IToken from "Token/IToken";
    import TokenType from "Token/TokenType";
    export default class Token<T extends TokenType> implements IToken {
        readonly type: T;
        readonly lexeme: string;
        readonly file: string;
        readonly col: number;
        readonly line: number;
        constructor(type: T, lexeme: string, info: IFileInfo);
    }
}
declare module "Token/index" {
    import IToken from "Token/IToken";
    import Token from "Token/Token";
    import TokenType from "Token/TokenType";
    export { IToken, Token, TokenType, };
}
declare module "TokenStream/splitTokenTypes" {
    import { TokenType } from "Token/index";
    export default function splitTokenTypes(type: TokenType): string;
}
declare module "TokenStream/ParseError" {
    import { CompilerError } from "Error/index";
    import { IToken } from "Token/index";
    import TokenStream from "TokenStream/TokenStream";
    export default class ParseError extends CompilerError {
        details: string;
        token: IToken;
        stream: TokenStream;
        constructor(message: string, details: string, token: IToken, stream: TokenStream);
        toString(): string;
    }
}
declare module "TokenStream/TokenStream" {
    import { IToken, TokenType } from "Token/index";
    export default class TokenStream {
        private tokens;
        private _index;
        private EOFToken;
        private index;
        constructor(tokens: IToken[]);
        readonly eof: boolean;
        peek(offset?: number): IToken;
        next(): IToken;
        expect(type: TokenType, message?: string): IToken;
        /**
         * @throws {Error}
         */
        panic(token: IToken, type: string | TokenType): never;
        /**
         * Generate a user friendly error message based on the current state and given token
         * #NOTE: this .filter() could be optimised with just using a normal for loop
         * @param token
         */
        friendlyError(token: IToken, message: string): string;
    }
}
declare module "TokenStream/index" {
    import TokenStream from "TokenStream/TokenStream";
    export { TokenStream };
}
declare module "AST/INode" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    export default interface INode {
        token?: IToken;
        stream?: TokenStream;
        nodeType: string;
        accept(visitor: IVisitor): void;
        friendlyError(message: string): string;
        [Symbol.toStringTag]: string;
    }
}
declare module "AST/Statement" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import Node from "AST/Node";
    export default class Statement extends Node {
        constructor(info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/FunctionDeclaration" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    import Node from "AST/Node";
    import Statement from "AST/Statement";
    export default class FunctionDeclaration extends Node {
        type: string;
        name: string;
        statements: Statement[];
        constructor(type: string, name: string, statements: Statement[], info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        accept(visitor: IVisitor): void;
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/Program" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    import FunctionDeclaration from "AST/FunctionDeclaration";
    import Node from "AST/Node";
    export default class Program extends Node {
        declaration: FunctionDeclaration;
        constructor(declaration: FunctionDeclaration, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        accept(visitor: IVisitor): void;
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/Declaration" {
    import Statement from "AST/Statement";
    import Expression from "AST/Expression";
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    export default class Declaration extends Statement {
        name: string;
        expression?: Expression | undefined;
        constructor(name: string, expression?: Expression | undefined, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        accept(visitor: IVisitor): void;
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/ReturnStatement" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    import Expression from "AST/Expression";
    import Statement from "AST/Statement";
    export default class ReturnStatement extends Statement {
        expression: Expression;
        constructor(expression: Expression, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        accept(visitor: IVisitor): void;
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/BinaryOp" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    import Expression from "AST/Expression";
    export default class BinaryOp extends Expression {
        operator: IToken;
        left: Expression;
        right: Expression;
        constructor(operator: IToken, left: Expression, right: Expression, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        accept(visitor: IVisitor): void;
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/UnaryOp" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    import Expression from "AST/Expression";
    export default class UnaryOp extends Expression {
        operator: IToken;
        expression: Expression;
        constructor(operator: IToken, expression: Expression, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        accept(visitor: IVisitor): void;
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/VariableReference" {
    import Expression from "AST/Expression";
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    export default class VariableReference extends Expression {
        name: string;
        constructor(name: string, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        accept(visitor: IVisitor): void;
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/IConstant" {
    export default interface IConstant<T> {
        value: T;
    }
}
declare module "AST/Constant" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import Expression from "AST/Expression";
    import IConstant from "AST/IConstant";
    export default class Constant<T = any> extends Expression implements IConstant<T> {
        type: string;
        value: T;
        constructor(type: string, value: T, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/IntegerConstant" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import Constant from "AST/Constant";
    export default class IntegerConstant<T extends number = number> extends Constant<T> {
        constructor(value: T, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/index" {
    import INode from "AST/INode";
    import Node from "AST/Node";
    import Program from "AST/Program";
    import FunctionDeclaration from "AST/FunctionDeclaration";
    import Statement from "AST/Statement";
    import Declaration from "AST/Declaration";
    import ReturnStatement from "AST/ReturnStatement";
    import Expression from "AST/Expression";
    import Assignment from "AST/Assignment";
    import BinaryOp from "AST/BinaryOp";
    import UnaryOp from "AST/UnaryOp";
    import VariableReference from "AST/VariableReference";
    import IConstant from "AST/IConstant";
    import Constant from "AST/Constant";
    import IntegerConstant from "AST/IntegerConstant";
    export { INode, Node, Program, FunctionDeclaration, Statement, Declaration, ReturnStatement, Expression, Assignment, BinaryOp, UnaryOp, VariableReference, IConstant, Constant, IntegerConstant, };
}
declare module "Visitor/IVisitor" {
    import { INode } from "AST/index";
    export default interface IVisitor<T = any> {
        visit(node: INode): void;
        result?: T;
    }
}
declare module "Visitor/Visitor" {
    import { INode } from "AST/index";
    import IVisitor from "Visitor/IVisitor";
    export default class Visitor<T = string> implements IVisitor<T> {
        constructor();
        visit(node: INode): void;
    }
}
declare module "Visitor/index" {
    import IVisitor from "Visitor/IVisitor";
    import Visitor from "Visitor/Visitor";
    export { IVisitor, Visitor, };
}
declare module "AST/Node" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    import INode from "AST/INode";
    export default class Node implements INode {
        token?: IToken;
        stream?: TokenStream;
        constructor(info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
        readonly nodeType: string;
        friendlyError(message: string): string;
        accept(visitor: IVisitor): void;
    }
}
declare module "AST/Expression" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import Node from "AST/Node";
    export default class Expression extends Node {
        constructor(info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/Assignment" {
    import Expression from "AST/Expression";
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import { IVisitor } from "Visitor/index";
    export default class Assignment extends Expression {
        name: string;
        expression: Expression;
        constructor(name: string, expression: Expression, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        accept(visitor: IVisitor): void;
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "Generator/ILabel" {
    export default interface ILabel {
        label: string;
        annotate(msg: string): string;
        toString(): string;
    }
}
declare module "Generator/StackFrame" {
    export default class StackFrame {
        private index;
        private dict;
        constructor();
        get(key: string): number;
        set(key: string): number;
        exists(key: string): boolean;
    }
}
declare module "Generator/CodeGenVisitor" {
    import * as AST from "AST/index";
    import { Visitor } from "Visitor/index";
    import ILabel from "Generator/ILabel";
    export default class CodeGenVisitor extends Visitor<string> {
        private labelId;
        private text;
        private stackFrame;
        constructor();
        readonly result: string;
        generateLabel(extra?: string): ILabel;
        visitFunctionDeclaration(node: AST.FunctionDeclaration): void;
        visitReturnStatement(node: AST.ReturnStatement): void;
        visitDeclaration(node: AST.Declaration): void;
        visitVariableReference(node: AST.VariableReference): void;
        visitAssignment(node: AST.Assignment): void;
        visitBinaryOp(node: AST.BinaryOp): void;
        visitUnaryOp(node: AST.UnaryOp): void;
        visitIntegerConstant(node: AST.IntegerConstant): void;
    }
}
declare module "Generator/generate" {
    import { INode } from "AST/index";
    export default function generate(ast: INode): string;
}
declare module "Generator/index" {
    import generate from "Generator/generate";
    import CodeGenVisitor from "Generator/CodeGenVisitor";
    import ILabel from "Generator/ILabel";
    export { CodeGenVisitor, ILabel, generate, };
}
declare module "Lexer/keywords" {
    const keywords: string[];
    export default keywords;
}
declare module "Lexer/is" {
    const is: {
        decimal: (c: string) => boolean;
        digit: (c: string) => boolean;
        hex: (c: string) => boolean;
        identifier: (c: string) => boolean;
        identifierStart: (c: string) => boolean;
        keyword: (c: string) => boolean;
        octal: (c: string) => boolean;
        integerSuffix: (c: string) => boolean;
    };
    export default is;
}
declare module "Lexer/lex" {
    import { StringStream } from "StringStream/index";
    import { IToken } from "Token/index";
    export default function lex(stream: string | StringStream, filename?: string): IToken[];
}
declare module "Lexer/index" {
    import is from "Lexer/is";
    import keywords from "Lexer/keywords";
    import lex from "Lexer/lex";
    export { lex, is, keywords, };
}
declare module "Optimizer/OptimizerVisitor" {
    import { BinaryOp, Expression, INode, UnaryOp } from "AST/index";
    import { Visitor } from "Visitor/index";
    export default class OptimizerVisitor extends Visitor<INode> {
        private ast;
        readonly result: INode;
        constructor();
        visit(node: INode): void;
        evaluateUnaryOp(node: UnaryOp): Expression;
        evaluateBinaryOp(node: BinaryOp): Expression;
    }
}
declare module "Optimizer/optimize" {
    import { INode } from "AST/index";
    export default function optimize(ast: INode): INode;
}
declare module "Optimizer/index" {
    import optimize from "Optimizer/optimize";
    import OptimizerVisitor from "Optimizer/OptimizerVisitor";
    export { optimize, OptimizerVisitor, };
}
declare module "Options/IOptions" {
    export default interface IOptions {
        optimize: boolean;
    }
}
declare module "Options/options" {
    const options: {
        optimize: boolean;
    };
    export default options;
}
declare module "Options/index" {
    import IOptions from "Options/IOptions";
    import defaultOptions from "Options/options";
    export { IOptions, defaultOptions, };
}
declare module "Parser/parseExpression" {
    import { Expression } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseExpression(stream: TokenStream): Expression;
}
declare module "Parser/parseStatement" {
    import { Statement } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseStatement(stream: TokenStream): Statement;
}
declare module "Parser/parseFunctionDeclaration" {
    import { FunctionDeclaration } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseFunctionDeclaration(stream: TokenStream): FunctionDeclaration;
}
declare module "Parser/parseProgram" {
    import { Program } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseProgram(stream: TokenStream): Program;
}
declare module "Parser/parse" {
    import { Node } from "AST/index";
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    export default function parse(stream: IToken[] | TokenStream): Node;
}
declare module "Parser/parseLogicalOr" {
    import { Expression } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseLogicalOr(stream: TokenStream): Expression;
}
declare module "Parser/parseLogicalAnd" {
    import { Expression } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseLogicalOr(stream: TokenStream): Expression;
}
declare module "Parser/parseEquality" {
    import { Expression } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseLogicalOr(stream: TokenStream): Expression;
}
declare module "Parser/parseRelational" {
    import { Expression } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseLogicalOr(stream: TokenStream): Expression;
}
declare module "Parser/parseAdditive" {
    import { Expression } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseAdditive(stream: TokenStream): Expression;
}
declare module "Parser/parseFactor" {
    import { Expression } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseFactor(stream: TokenStream): Expression;
}
declare module "Parser/parseTerm" {
    import { Expression } from "AST/index";
    import { TokenStream } from "TokenStream/index";
    export default function parseTerm(stream: TokenStream): Expression;
}
declare module "Parser/index" {
    import parse from "Parser/parse";
    import parseProgram from "Parser/parseProgram";
    import parseFunctionDeclaration from "Parser/parseFunctionDeclaration";
    import parseStatement from "Parser/parseStatement";
    import parseExpression from "Parser/parseExpression";
    import parseLogicalOr from "Parser/parseLogicalOr";
    import parseLogicalAnd from "Parser/parseLogicalAnd";
    import parseEquality from "Parser/parseEquality";
    import parseRelational from "Parser/parseRelational";
    import parseAdditive from "Parser/parseAdditive";
    import parseTerm from "Parser/parseTerm";
    import parseFactor from "Parser/parseFactor";
    export { parse, parseProgram, parseFunctionDeclaration, parseStatement, parseExpression, parseLogicalOr, parseLogicalAnd, parseEquality, parseRelational, parseAdditive, parseTerm, parseFactor, };
}
