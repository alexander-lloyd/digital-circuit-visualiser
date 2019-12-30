module.exports =  {
    parser:  '@typescript-eslint/parser',  // Specifies the ESLint parser
    extends:  [
      'eslint:recommended',
      'plugin:jsdoc/recommended',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:react/recommended',
    ],
   parserOptions:  {
      ecmaVersion:  2018,  // Allows for the parsing of modern ECMAScript features
      sourceType:  'module',  // Allows for the use of imports
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
      "jsdoc",
      "react-hooks"
    ],
    rules:  {
      // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
      "@typescript-eslint/no-empty-interface": "warn",
      "jsdoc/no-types": 0,
      "jsdoc/require-param-type": 0,
      "jsdoc/require-returns-type": 0,
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
  };