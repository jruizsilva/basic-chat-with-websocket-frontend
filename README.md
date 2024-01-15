**eslint with prettier v3**

Install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), and [Format Code Action](https://marketplace.visualstudio.com/items?itemName=rohit-gohri.format-code-action&ssr=false#review-details)

1. `pnpm add -D eslint prettier eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-react-hooks`
2. Create .prettierrc and add

```
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
}
```

or open settings.json and add

```
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "prettier.jsxSingleQuote": true,
  "prettier.trailingComma": "none",
```

3. `pnpm create @eslint/config`
4. Open .eslintrc and add

```
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  settings: { react: { version: 'detect' } },
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    'import/order': ['warn', { 'newlines-between': 'always' }],
    'react/self-closing-comp': 'warn',
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        noSortAlphabetically: false,
        reservedFirst: true
      }
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}

```

5. Open package.json en add

```
    "scripts": {
      "lint": "npx eslint src",
      "lint:fix": "npm run lint -- --fix",
      "prettier": "npx prettier src --check",
      "prettier:fix": "npm run prettier -- --write",
      "format": "npm run prettier:fix && npm run lint:fix"
    },
```

and

```
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": [
    "source.formatDocument",
    "source.fixAll.eslint"
  ],
```

6. Create .eslintignore and ignore this files(optional)

```
src/vite-env.d.ts
vite.config.ts
.eslintrc.cjs
```
