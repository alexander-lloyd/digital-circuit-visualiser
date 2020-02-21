module.exports = {
  parser: "@typescript-eslint/parser",  // Specifies the ESLint parser
  extends: [
    "eslint:all",
    "plugin:jsdoc/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/all",
    "plugin:jest/all"
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: "module",  // Allows for the use of imports
    ecmaFeatures: {
      jsx: true
    },
    project: [
      "./tsconfig.app.json",
      "./tsconfig.spec.json"
    ]
  },
  plugins: [
    "@typescript-eslint",
    "jest",
    "jsdoc",
    "react-hooks"
  ],
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    "@typescript-eslint/indent": ["error", 4, { "ignoredNodes": ["JSXElement *", "JSXElement"]}],
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-extra-parens": ["error", "all", {
      ignoreJSX: 'multi-line',
      nestedBinaryExpressions: false
    }],
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/semi": "error",
    "array-element-newline": ["error", "consistent"],
    "complexity": ["error", 10],
    "consistent-return": "error",
    "class-methods-use-this": "off",
    "curly": "error",
    "default-case": "error",
    "default-param-last": "off",
    "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
    "function-call-argument-newline": "off",
    "id-length": "off",
    // Use @typescript-eslint version instead.
    "indent": "off",
    "init-declarations": "off",
    "jsdoc/no-bad-blocks" : "error",
    "jsdoc/no-types": 0,
    "jsdoc/require-jsdoc": ["error", {
      "require": {
        "ArrowFunctionExpression": true,
        "ClassDeclaration": true,
        "ClassExpression": true,
        "FunctionDeclaration": true,
        "FunctionExpression": true,
        "MethodDefinition": true
      },
      "contexts": [
        "TSInterfaceDeclaration"
      ]
    }],
    "jsdoc/require-param-type": "off",
    "jsdoc/require-returns-type": "off",
    "lines-around-comment": "off",
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "max-classes-per-file": ["warn", 20],
    "max-len": ["warn", 120],
    "max-lines": ["warn", 1000],
    "max-lines-per-function": ["error", 300],
    "max-params": ["error", 8],
    "max-statements": ["warn", 25],
    "multiline-ternary": ["error", "always-multiline"],
    "no-console": "warn",
    "no-continue": "off",
    "no-extra-parens": "off",
    "no-magic-numbers": "off",
    "no-plusplus": "off",
    "no-sync": "off",
    "no-ternary": "off",
    "no-undefined": "off",
    "no-underscore-dangle": "off",
    "no-useless-constructor": "off",
    "no-warning-comments": "warn",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "never", {

    }],
    "one-var": ["error", "never"],
    "padded-blocks": ["error", "never"],
    "quotes": ["error", "single"],
    "quote-props": ["error", "as-needed"],
    "react/jsx-closing-bracket-location": ["error", {
      "nonEmpty": "after-props",
      "selfClosing": "after-props"
    }],
    "react/jsx-curly-brace-presence": ["error", {
      "props": "never",
      "children": "never",
    }],
    "react/jsx-curly-newline": ["error", {
      "multiline": "require"
    }],
    "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
    "react/jsx-first-prop-new-line": ["error", "never"],
    "react/jsx-indent-props": ["error", "first"],
    "react/jsx-max-depth": ["error", { "max": 5 }],
    "react/jsx-no-bind": ["error", {
      "ignoreDOMComponents": true,
    }],
    "react/jsx-no-literals": ["off"],
    "react/jsx-one-expression-per-line": ["error", {
      "allow": "single-child"
    }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "space-before-function-paren": "off",
    "sort-imports": "off",
    "sort-keys": "off",
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  overrides: [
    {
      "files": ["src/lib/parser/parser.ts"],
      "rules": {
        "multiline-comment-style": "off",
        "quotes": "off",
        "strict": "off",
      }
    }
  ]
};
