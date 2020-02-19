/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');

const pegjs = require("pegjs");
const tspegjs = require("ts-pegjs");

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

const grammar = fs.readFileSync('./src/lib/parser/grammar.pegjs').toString();

const parser = pegjs.generate(grammar, {
    output: "source",
    format: "commonjs",
    plugins: [tspegjs],
    "tspegjs": {
        "noTslint": true,
        "customHeader": eslintDisabledRules
    }
}).toString();

fs.writeFileSync('./src/lib/parser/parser.ts', parser);