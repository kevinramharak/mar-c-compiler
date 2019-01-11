import { StringStream } from '../StringStream';
import IFileInfo from './IFileInfo';

export default class FileInfo implements IFileInfo {
    private _line = 1;
    private _col = 1;

    public get line(): number {
        return this._line;
    }

    public get col(): number {
        return this._col;
    }

    constructor(public readonly stream: StringStream, public readonly name: string = '[anonymous]') {
        stream.emitter.on('next', this.nextHandler.bind(this));
    }

    private nextHandler(substr: string) {
        let index = 0;
        while (index < substr.length) {
            switch(substr[index++]) {
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
