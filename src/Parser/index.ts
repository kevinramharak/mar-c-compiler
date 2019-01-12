import parse from './parse';

/*
<program> ::= <function>
<function> ::= "int" <id> "(" ")" "{" <statement> "}"
<statement> ::= "return" <exp> ";"
<exp> ::= <logical-and-exp> { "||" <logical-and-exp> }
<logical-and-exp> ::= <equality-exp> { "&&" <equality-exp> }
<equality-exp> ::= <relational-exp> { ("!=" | "==") <relational-exp> }
<relational-exp> ::= <additive-exp> { ("<" | ">" | "<=" | ">=") <additive-exp> }
<additive-exp> ::= <term> { ("+" | "-") <term> }
<term> ::= <factor> { ("*" | "/") <factor> }
<factor> ::= "(" <exp> ")" | <unary_op> <factor> | <int>
<unary_op> ::= "!" | "~" | "-"
*/

import parseProgram from './parseProgram';
import parseFunctionDeclaration from './parseFunctionDeclaration';
import parseStatement from './parseStatement';

import parseExpression from './parseExpression';
import parseLogicalOr from './parseLogicalOr';
import parseLogicalAnd from './parseLogicalAnd';
import parseEquality from './parseEquality';
import parseRelational from './parseRelational';
import parseAdditive from './parseAdditive';

import parseTerm from './parseTerm';
import parseFactor from './parseFactor';


export {
    parse,

    parseProgram,
    parseFunctionDeclaration,
    parseStatement,
    
    parseExpression,
    parseLogicalOr,
    parseLogicalAnd,
    parseEquality,
    parseRelational,
    parseAdditive,

    parseTerm,
    parseFactor,
}