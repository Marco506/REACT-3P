import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],  // Agrega soporte para TypeScript
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } }, // Cambia a 'detect' para que ESLint detecte la versión
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // Desactiva o ajusta reglas según tus necesidades
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Añade reglas para props no utilizadas
      'react/prop-types': 'off', // Si usas TypeScript, probablemente quieras desactivar PropTypes
      'react/jsx-uses-react': 'error', // Detecta JSX usage
      'react/jsx-uses-vars': 'error',  // Detecta variables JSX no usadas

      // Opcionalmente, podrías habilitar estas reglas para mejores prácticas
      'react/react-in-jsx-scope': 'off', // No necesario con React 17+
      'react/jsx-no-undef': 'error', // Asegura que no usas componentes indefinidos
    },
  },
]