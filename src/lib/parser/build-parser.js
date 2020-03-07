/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const pegjs = require('pegjs');
const tspegjs = require('ts-pegjs');

const eslintDisabledRules = '/* eslint-disable */';

const AST_IMPORT_STATEMENT = '\n\nimport * as AST from \'./ast\';\n\n';

const grammar = fs.readFileSync('./src/lib/parser/grammar.pegjs').toString();

const parser = pegjs.generate(grammar, {
    output: 'source',
    format: 'commonjs',
    plugins: [tspegjs],
    tspegjs: {
        noTslint: true,
        customHeader: eslintDisabledRules + AST_IMPORT_STATEMENT
    },
    returnTypes: {
        statement: 'AST.AST',
        expression: 'AST.AST',
        letdeclaraion: 'AST.LetAST',
        term: 'AST.AST',
        term2: 'AST.AST',
        factor: 'AST.AST',
        constant: 'AST.ConstantAST',
        identifier: 'AST.IdentifierAST'
    }
}).toString();

fs.writeFileSync('./src/lib/parser/parser.ts', parser);
