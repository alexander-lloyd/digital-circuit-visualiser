statement = l:letdeclaration _ semicolon {
  return l;
}

expr = i:integer {
  return {
    type: 'integer',
    variable: i
  };
}

letdeclaration = let _ v:variable _ equals _ e:expr _ in _ body:expr {
  return {
    type: 'let',
    variable: v,
    expr: e,
    body: body
  };
}

variable = head:[a-z] tail:[A-Za-z0-9]* {
  return [head, ...tail].join('');
}

let = "let"
in = "in"

// Symbols
equals = "="
semicolon = ";"

integer = [0-9]

_ "whitespace" = [ \t\n\r]*