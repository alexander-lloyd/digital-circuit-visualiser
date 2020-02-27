statement
  = _ l:letdeclaration _ {
    return l;
  }
  / _ e:expression _ {
    return e;
  }

letdeclaration
  = let _ name:identifier _ equals _ expression:expression _ in _ body:expression {

    return new AST.LetAST(name, expression, body);
  }

expression
  = left:term _ operator:tensor _ right:expression {
    return new AST.BinaryOpAST(operator, left, right);
  } / term

term
  = left:factor _ operator:compose _ right:term {
    return new AST.BinaryOpAST(operator, left, right);
  } / factor

factor
  = constant /
    identifier /
    leftparam _ expression:expression _ rightparam {
      return expression;
    }

constant
  = head:[A-Z] tail:[A-Z]* {

    const name = [head, ...tail].join('');
    return new AST.ConstantAST(name);

  }

identifier
  = head:[a-z] tail:[A-Za-z0-9]* {

    const name = [head, ...tail].join('');
    return new AST.IdentifierAST(name);
  }

/*** Tokens ***/

/* Symbols */
equals = "="
semicolon = ";"
leftparam = "("
rightparam = ")"

/* Reserved Words */
let = "let"
in = "in"
tensor = "tensor"
compose = "compose"

_ "whitespace"
  = [ \t\n\r]*
