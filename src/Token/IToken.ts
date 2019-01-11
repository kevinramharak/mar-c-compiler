import TokenType from './TokenType';

export default interface IToken {
    lexeme: string;
    type: TokenType;
    file: string;
    line: number;
    col: number;
}
