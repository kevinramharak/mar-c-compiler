import { CompilerError } from "../Error";

export default class StackFrame {
    private offset = 0;
    private dict = new Map<string, number>();

    constructor() {

    }

    public get(key: string): number {
        if (!this.dict.has(key)) {
            throw new CompilerError(`Variable does not exist: '${key}'`);
        }
        return this.dict.get(key)!;
    }

    public set(key: string): number {
        if (this.dict.has(key)) {
            throw new CompilerError(`Variable already declared: '${key}'`)
        }
        this.dict.set(key, ++this.offset);
        return this.offset;
    }

    public exists(key: string): boolean {
        return this.dict.has(key);
    }
}
