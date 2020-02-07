module.exports = {
  parser: '@typescript-eslint/parser',  // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/all',
    'plugin:jest/all'
  ],
  parserOptions: {
    ecmaVersion: 2018,  // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',  // Allows for the use of imports
    ecmaFeatures: {
      jsx: true
    },
    project: [
      './tsconfig.app.json',
      './tsconfig.spec.json'
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
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/semi": ["error"],
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
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
