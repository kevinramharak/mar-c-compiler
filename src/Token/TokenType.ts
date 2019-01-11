
const bit = (n: number) => 2 ** n;

enum TokenType {
    EOF = 0,
    UNKOWN = bit(0),

    LEFT_BRACE = bit(1),
    RIGHT_BRACE = bit(2),
    LEFT_PAREN = bit(3),
    RIGHT_PAREN = bit(4),

    SEMI_COLON = bit(5),

    NEGATION = bit(6),
    ADDITION = bit(7),
    MULTIPLICATION = bit(8),
    DIVISION = bit(9),


    BITWISE_COMPLEMENT = bit(10),

    LOGICAL_NOT = bit(11),
    LOGICAL_AND = bit(12),
    LOGICAL_OR = bit(13),

    KEYWORD = bit(14),
    IDENTIFIER = bit(15),

    INTEGER_LITERAL = bit(16),

    // helper types - represents multiple types
    UNARY_OP = TokenType.BITWISE_COMPLEMENT | TokenType.NEGATION | TokenType.LOGICAL_NOT,
    BINARY_OP = TokenType.NEGATION | TokenType.ADDITION | TokenType.MULTIPLICATION | TokenType.DIVISION,
};

export default TokenType;
