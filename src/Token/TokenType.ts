
const bit = (n: number) => 2 ** n;

enum TokenType {
    EOF = 0,
    UNKOWN = bit(0),

    LEFT_BRACE = bit(1), // {
    RIGHT_BRACE = bit(2), // }
    LEFT_PAREN = bit(3), // (
    RIGHT_PAREN = bit(4), // )

    SEMI_COLON = bit(5), // ;
    COLON = bit(6), // :
    QUESTION_MARK = bit(7), // ?

    NEGATION = bit(8), // -
    ADDITION = bit(9), // +
    MULTIPLICATION = bit(10), // *
    DIVISION = bit(11), // /
    MODULO = bit(12), // %

    BITWISE_NOT = bit(13), // ~
    BITWISE_OR = bit(14), // |
    BITWISE_AND = bit(15), // &
    BITWISE_XOR = bit(16), // ^

    LOGICAL_NOT = bit(17), // !
    LOGICAL_AND = bit(18), // &&
    LOGICAL_OR = bit(19),  // ||
    
    ASSIGN = bit(20), // =
    EQUALS = bit(21), // ==
    NOT_EQUALS = bit(22), // !=

    LESS_THAN = bit(23), // <
    LESS_OR_EQUALS = bit(24), // <=
    GREATER_THAN = bit(25), // >
    GREATER_OR_EQUALS = bit(26), // >=

    KEYWORD = bit(27),
    IDENTIFIER = bit(28), // /[a-z_][a-z0-9_]*/i

    INTEGER_LITERAL = bit(29), // /[1-9][0-9]*/
    FLOAT_LITERAL = bit(30),  // /[1-9][0-9]*[.][0-9]*/

    // helper types - represents multiple types
    UNARY_OP = TokenType.BITWISE_NOT | TokenType.NEGATION | TokenType.LOGICAL_NOT,
    ADDITIVE = TokenType.NEGATION | TokenType.ADDITION,
    TERM = TokenType.MULTIPLICATION | TokenType.DIVISION | TokenType.MODULO,
    RELATIONAL = TokenType.LESS_THAN | TokenType.LESS_OR_EQUALS | TokenType.GREATER_THAN | TokenType.GREATER_OR_EQUALS,
    EQUALITY = TokenType.EQUALS | TokenType.NOT_EQUALS,
    BINARY_OP = TokenType.TERM | TokenType.ADDITIVE | TokenType.RELATIONAL | TokenType.EQUALITY,
};

export default TokenType;
