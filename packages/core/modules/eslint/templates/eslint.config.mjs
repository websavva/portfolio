import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

import _withNuxt from './eslint.config.mjs';

export const withNuxt = (...customs) =>
  _withNuxt(
    eslintPluginPrettier,
    {
      rules: {
        '@typescript-eslint/no-extraneous-class': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-dynamic-delete': 'off',

        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
            ],
            'newlines-between': 'always',
            pathGroups: [
              {
                pattern: '#shared/**',
                patternOptions: {
                  dot: true,
                  nocomment: true,
                },
                group: 'internal',
              },
              {
                pattern: '#server/**',
                patternOptions: {
                  dot: true,
                  nocomment: true,
                },
                group: 'internal',
              },
              {
                pattern: '#**',
                patternOptions: {
                  dot: true,
                  nocomment: true,
                },
                group: 'external',
              },
              {
                pattern: '#*/**',
                patternOptions: {
                  dot: true,
                  nocomment: true,
                },
                group: 'external',
              },
              {
                pattern: '~/**',
                group: 'internal',
              },
              {
                pattern: '@/**',
                group: 'internal',
              },
            ],
          },
        ],
      },
    },
    ...customs,
  );
