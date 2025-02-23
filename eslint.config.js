import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['src/**/*.{ts,tsx}', 'pages/**/*.{ts,tsx}'],
    languageOptions: {
      parser: parserTs,
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,
      ...pluginReactRefresh.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
];
