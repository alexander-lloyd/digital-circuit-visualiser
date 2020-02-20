statement
  = l:letdeclaration _ semicolon _

letdeclaration
  = let _ name:identifier _ equals _ expression:expression _ in _ body:expression {

    return new AST.LetAST(name, expression, body);

  }

expression
  = application / 
    constant /
    identifier

application
  = identifier:identifier _ leftparam _ rightparam {
    // TODO: Parameter list.
    return new AST.ApplicationAST(identifier, []);
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

equals = "="
semicolon = ";"
leftparam = "("
rightparam = ")"

/* Symbols */
let = "let"
in = "in"

_ "whitespace"
  = [ \t\n\r]*
