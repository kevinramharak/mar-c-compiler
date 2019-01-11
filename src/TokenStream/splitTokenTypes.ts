import { TokenType } from '../Token';

// based on Number.MAX_SAFE_INTEGER
const TokenTypeMax = 52;

export default function splitTokenTypes(type: TokenType): string {
    const types: string[] = [];
    for(let i = 0, bit = 0; i < TokenTypeMax; i++) {
        bit = 2 ** i;
        const test = type & bit;
        if (test) {
            types.push(TokenType[bit]);
        }
    }
    return types.join('|');
}
