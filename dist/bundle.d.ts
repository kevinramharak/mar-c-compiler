declare module "Token/TokenType" {
    enum TokenType {
        EOF = 0,
        UNKOWN,
        LEFT_BRACE,
        RIGHT_BRACE,
        LEFT_PAREN,
        RIGHT_PAREN,
        SEMI_COLON,
        NEGATION,
        ADDITION,
        MULTIPLICATION,
        DIVISION,
        BITWISE_COMPLEMENT,
        LOGICAL_NOT,
        LOGICAL_AND,
        LOGICAL_OR,
        KEYWORD,
        IDENTIFIER,
        INTEGER_LITERAL,
        UNARY_OP,
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
declare module "StringStream/EOFError" {
    export default class EOFError extends Error {
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
    import { IToken } from "Token/index";
    import TokenStream from "TokenStream/TokenStream";
    export default class ParseError extends Error {
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
        peek(): IToken;
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
    export default interface INode {
        children: INode[];
        token?: IToken;
        stream?: TokenStream;
        friendlyError(message: string): string;
        [Symbol.toStringTag]: string;
    }
}
declare module "AST/Node" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import INode from "AST/INode";
    export default class Node implements INode {
        readonly token?: IToken;
        readonly stream?: TokenStream;
        children: INode[];
        constructor(info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
        friendlyError(message: string): string;
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
declare module "AST/BinaryOp" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import Expression from "AST/Expression";
    export default class BinaryOp extends Expression {
        readonly operator: string;
        readonly left: Expression;
        readonly right: Expression;
        constructor(operator: string, left: Expression, right: Expression, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
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
    import Node from "AST/Node";
    import IConstant from "AST/IConstant";
    export default class Constant<T = any> extends Node implements IConstant<T> {
        type: string;
        readonly value: T;
        constructor(type: string, value: T, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
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
    import Node from "AST/Node";
    import Statement from "AST/Statement";
    export default class FunctionDeclaration extends Node {
        readonly type: string;
        readonly name: string;
        readonly statement: Statement;
        constructor(type: string, name: string, statement: Statement, info?: Partial<{
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
declare module "AST/Program" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import FunctionDeclaration from "AST/FunctionDeclaration";
    import Node from "AST/Node";
    export default class Program extends Node {
        readonly declaration: FunctionDeclaration;
        constructor(declaration: FunctionDeclaration, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/ReturnStatement" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import Expression from "AST/Expression";
    import Statement from "AST/Statement";
    export default class ReturnStatement extends Statement {
        readonly expression: Expression;
        constructor(expression: Expression, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/UnaryOp" {
    import { IToken } from "Token/index";
    import { TokenStream } from "TokenStream/index";
    import Expression from "AST/Expression";
    export default class UnaryOp extends Expression {
        readonly operator: string;
        readonly expression: Expression;
        constructor(operator: string, expression: Expression, info?: Partial<{
            token: IToken;
            stream: TokenStream;
        }>);
        readonly [Symbol.toStringTag]: string;
    }
}
declare module "AST/index" {
    import BinaryOp from "AST/BinaryOp";
    import Constant from "AST/Constant";
    import IntegerConstant from "AST/IntegerConstant";
    import Expression from "AST/Expression";
    import FunctionDeclaration from "AST/FunctionDeclaration";
    import INode from "AST/INode";
    import Node from "AST/Node";
    import Program from "AST/Program";
    import ReturnStatement from "AST/ReturnStatement";
    import UnaryOp from "AST/UnaryOp";
    import Statement from "AST/Statement";
    export { BinaryOp, Constant, IntegerConstant, Expression, FunctionDeclaration, Program, Node, INode, ReturnStatement, Statement, UnaryOp, };
}
declare module "Generator/Visitor" {
    import { Node } from "AST/index";
    export default class Visitor<R = string> {
        constructor();
        visit<T = R>(node: Node, ...args: any[]): T | T[];
    }
}
declare module "Generator/CodeGenVisitor" {
    import * as AST from "AST/index";
    import Visitor from "Generator/Visitor";
    export default class CodeGenVisitor extends Visitor<string> {
        constructor();
        visitProgram(node: AST.Program): string;
        visitFunctionDeclaration(node: AST.FunctionDeclaration): string;
        visitReturnStatement(node: AST.ReturnStatement): string;
        visitBinaryOp(node: AST.BinaryOp): string;
        visitUnaryOp(node: AST.UnaryOp): string;
        visitConstant(node: AST.Constant): string;
        visitIntegerConstant(node: AST.IntegerConstant): string;
    }
}
declare module "Generator/generate" {
    import { Node } from "AST/index";
    export default function generate(ast: Node): string;
}
declare module "Generator/index" {
    import generate from "Generator/generate";
    export { generate };
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
declare module "Parser/index" {
    import parse from "Parser/parse";
    export { parse };
}
