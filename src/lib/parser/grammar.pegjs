statement
  = _ e:expression _ {
    return e;
  }

expression
  = letdeclaration
  / left:term _ operator:tensor _ right:expression {
    return new AST.BinaryOpAST('tensor', left, right);
  }
  / term

letdeclaration
  = let _ name:identifier _ equals _ expression:expression _ in _ body:expression {
    return new AST.LetAST(name, expression, body);
  }

term
  = left:term2 _ operator:compose _ right:term {
    return new AST.BinaryOpAST('compose', left, right);
  }
  / term2

term2
  = feedback _ child:factor {
    return new AST.UnaryOpAST('feedback', child);
  }
  / factor

factor
  = constant
  / identifier
  / leftparam _ expression:expression _ rightparam {
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
leftparam = "("
rightparam = ")"

/* Reserved Words */
let = "let"
in = "in"
tensor = "*"
compose = "."
feedback = "feedback"

_ "whitespace"
  = [ \t\n\r]*
