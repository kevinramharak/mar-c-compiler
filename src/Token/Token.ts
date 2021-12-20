import { IFileInfo } from '../FileInfo';
import IToken from './IToken';
import TokenType from './TokenType';


export default class Token<T extends TokenType> implements IToken {
    public readonly file: string;
    public readonly col: number;
    public readonly line: number;

    constructor(public readonly type: T, public readonly lexeme: string, info: IFileInfo = { col: 0, line: 0, name: '[unknown]'}) {
        this.file = info.name;
        this.line = info.line;
        this.col = info.col;
    }

    public toJSON() {
        return {
            lexeme: this.lexeme,
            type: TokenType[this.type],
            file: this.file,
            line: this.line,
            col: this.col,
        };
    }
}
