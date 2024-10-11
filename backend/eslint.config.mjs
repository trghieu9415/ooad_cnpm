import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  { files: ['**/*.{js,mjs,cjs}'] }, // Không còn .ts, vì đây là phiên bản JS
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      'no-unused-vars': 'off',
      'no-useless-catch': 'off',
      'no-useless-escape': 'off',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]
