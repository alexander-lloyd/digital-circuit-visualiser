/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const pegjs = require('pegjs');
const tspegjs = require('ts-pegjs');

const eslintDisabledRules = [
    'no-case-declarations',
    'no-control-regex',
    'prefer-const',
    'jsdoc/require-jsdoc',
    '@typescript-eslint/explicit-function-return-type',
    '@typescript-eslint/interface-name-prefix',
    '@typescript-eslint/no-explicit-any',
    '@typescript-eslint/no-empty-interface',
    '@typescript-eslint/no-unused-vars',
    '@typescript-eslint/no-use-before-define',
].map(rule => `/* eslint-disable ${rule} */`).join('\n');

const AST_IMPORT_STATEMENT = `\n\nimport * as AST from './ast';\n\n`;

const grammar = fs.readFileSync('./src/lib/parser/grammar.pegjs').toString();

const parser = pegjs.generate(grammar, {
    output: 'source',
    format: 'commonjs',
    plugins: [tspegjs],
    tspegjs: {
        'noTslint': true,
        'customHeader': eslintDisabledRules + AST_IMPORT_STATEMENT,
    },
    returnTypes: {
        application: 'AST.ApplicationAST',
        constant: 'AST.ConstantAST',
        expression: 'AST.ExpressionAST',
        identifier: 'AST.IdentifierAST',
        letdeclaraion: 'AST.LetDeclarationAST'
    }
}).toString();

fs.writeFileSync('./src/lib/parser/parser.ts', parser);