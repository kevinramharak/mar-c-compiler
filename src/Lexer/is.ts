
import keywords from './keywords';

const is = {
    decimal: (c: string) => c >= '1' && c <= '9',
    digit: (c: string) => c === '0' || is.decimal(c),
    hex: (c: string) => (c >= 'a' && c<= 'f') || (c >= 'A' && c <= 'F') || is.digit(c),
    identifier: (c: string) => is.identifierStart(c) || is.digit(c),
    identifierStart: (c: string) => c === '_' || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z'),
    keyword: (c: string) => keywords.includes(c),
    octal: (c: string) => c >= '0' && c <= '7',
    integerSuffix: (c: string) => c === 'u' || c === 'U' || c === 'L' || c === 'l',
};

export default is;