
const bit = (n: number) => 2 ** n;

enum TokenType {
    EOF = 0,
    UNKOWN = bit(0),

    LEFT_BRACE = bit(1), // {
    RIGHT_BRACE = bit(2), // }
    LEFT_PAREN = bit(3), // (
    RIGHT_PAREN = bit(4), // )

    COMMA = bit(5), // ,
    SEMI_COLON = bit(6), // ;
    COLON = bit(7), // :
    QUESTION_MARK = bit(8), // ?

    NEGATION = bit(9), // -
    ADDITION = bit(10), // +
    MULTIPLICATION = bit(11), // *
    DIVISION = bit(12), // /
    MODULO = bit(13), // %

    BITWISE_NOT = bit(14), // ~
    BITWISE_OR = bit(15), // |
    BITWISE_AND = bit(16), // &
    BITWISE_XOR = bit(17), // ^

    LOGICAL_NOT = bit(18), // !
    LOGICAL_AND = bit(19), // &&
    LOGICAL_OR = bit(20),  // ||
    
    ASSIGN = bit(21), // =
    EQUALS = bit(22), // ==
    NOT_EQUALS = bit(23), // !=

    LESS_THAN = bit(24), // <
    LESS_OR_EQUALS = bit(25), // <=
    GREATER_THAN = bit(26), // >
    GREATER_OR_EQUALS = bit(27), // >=

    KEYWORD = bit(28),
    IDENTIFIER = bit(29), // /[a-z_][a-z0-9_]*/i

    INTEGER_LITERAL = bit(30), // /[1-9][0-9]*/
    FLOAT_LITERAL = bit(31),  // /[1-9][0-9]*[.][0-9]*/

    // helper types - represents multiple types
    UNARY_OP = TokenType.BITWISE_NOT | TokenType.NEGATION | TokenType.LOGICAL_NOT,
    ADDITIVE = TokenType.NEGATION | TokenType.ADDITION,
    TERM = TokenType.MULTIPLICATION | TokenType.DIVISION | TokenType.MODULO,
    RELATIONAL = TokenType.LESS_THAN | TokenType.LESS_OR_EQUALS | TokenType.GREATER_THAN | TokenType.GREATER_OR_EQUALS,
    EQUALITY = TokenType.EQUALS | TokenType.NOT_EQUALS,
    BINARY_OP = TokenType.TERM | TokenType.ADDITIVE | TokenType.RELATIONAL | TokenType.EQUALITY,
};

export default TokenType;
