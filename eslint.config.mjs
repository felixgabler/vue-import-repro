import { sxzz } from '@sxzz/eslint-config';
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
    sxzz(
        [
            {
                ignores: ['modules/*', 'public/scripts/**/*.js', 'assets/media/animations/**/*.json'],
            },
            {
                files: ['**/*.vue', '**/*.ts'],
                rules: {
                    'node/prefer-global/process': 'off',
                },
            },
            {
                files: ['**/*.ts'],
                rules: {
                    'import/no-default-export': 'off',
                    'jsdoc/check-param-names': 'off',
                },
            },
            {
                files: ['composables/*.ts'],
                rules: {
                    'unicorn/filename-case': ['error', { case: 'camelCase' }],
                },
            },
            {
                files: ['pages/**/*.vue'],
                rules: {
                    'unicorn/filename-case': 'off',
                },
            },
            {
                files: ['scripts/**/*.ts'],
                rules: {
                    'no-console': 'off',
                },
            },
        ],
        { vue: true, prettier: false, markdown: true, unocss: false },
    ),
);
