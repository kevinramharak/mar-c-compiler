
const bit = (n: number) => 2 ** n;

enum TokenType {
    EOF = 0,
    UNKOWN = bit(0),

    LEFT_BRACE = bit(1),
    RIGHT_BRACE = bit(2),
    LEFT_PAREN = bit(3),
    RIGHT_PAREN = bit(4),

    SEMI_COLON = bit(5),

    NEGATION = bit(6), // -
    ADDITION = bit(7), // +
    MULTIPLICATION = bit(8), // *
    DIVISION = bit(9), // /

    BITWISE_NOT = bit(10), // ~
    BITWISE_OR = bit(11), // |
    BITWISE_AND = bit(12), // &
    BITWISE_XOR = bit(13), // ^

    LOGICAL_NOT = bit(14), // !
    LOGICAL_AND = bit(15), // &&
    LOGICAL_OR = bit(16),  // ||
    
    ASSIGN = bit(17), // =
    EQUALS = bit(18), // ==
    NOT_EQUALS = bit(19), // !=

    LESS_THAN = bit(20), // <
    LESS_OR_EQUALS = bit(21), // <=
    GREATER_THAN = bit(22), // >
    GREATER_OR_EQUALS = bit(23), // >=

    KEYWORD = bit(24),
    IDENTIFIER = bit(25), // /[a-z_][a-z0-9_]*/i

    INTEGER_LITERAL = bit(26),

    // helper types - represents multiple types
    UNARY_OP = TokenType.BITWISE_NOT | TokenType.NEGATION | TokenType.LOGICAL_NOT,
    ADDITIVE = TokenType.NEGATION | TokenType.ADDITION,
    TERM = TokenType.MULTIPLICATION | TokenType.DIVISION,
    RELATIONAL = TokenType.LESS_THAN | TokenType.LESS_OR_EQUALS | TokenType.GREATER_THAN | TokenType.GREATER_OR_EQUALS,
    EQUALITY = TokenType.EQUALS | TokenType.NOT_EQUALS,
    BINARY_OP = TokenType.TERM | TokenType.ADDITIVE | TokenType.RELATIONAL | TokenType.EQUALITY,
};

export default TokenType;
