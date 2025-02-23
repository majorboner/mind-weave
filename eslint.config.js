// eslint.config.js
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
    files: ['**/*.{ts,tsx}'],
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
      // Общие правила ESLint
      ...pluginJs.configs.recommended.rules,

      // Правила TypeScript ESLint
      ...tseslint.configs.recommended.rules,

      // React
      ...pluginReact.configs.flat.recommended.rules,

      // React Hooks
      ...pluginReactHooks.configs.recommended.rules,

      // React Refresh
      ...pluginReactRefresh.configs.recommended.rules,

      // Дополнительные правила
      'react/react-in-jsx-scope': 'off',
    },
  },
];
