statement
  = l:letdeclaration _ semicolon _

letdeclaration
  = let _ name:identifier _ equals _ e:expression _ in _ body:expression {
    return {
      type: 'let',
      name: name,
      expression: e,
      body: body
    };
  }

expression
  = application / 
    constant /
    identifier

application
  = i:identifier _ leftparam _ rightparam {
    return {
      type: 'application',
      identifier: i,
      parameters: []
    };
  }

constant
  = head:[A-Z] tail:[A-Z]* {
    return {
      type: 'constant',
      name: [head, ...tail].join('')
    };
  }

identifier
  = head:[a-z] tail:[A-Za-z0-9]* {
    return {
      type: 'identifier',
      name: [head, ...tail].join('')
    };
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
