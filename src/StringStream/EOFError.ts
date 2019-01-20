import { CompilerError } from '../Error';

export default class EOFError extends CompilerError {
    constructor(...args: any[]) {
        super(...args);
    }
}
