require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["@inrupt/eslint-config-lib"],
  parserOptions: {
    tsconfigRootDir: __dirname, // this is the reason this is a .js file
    project: "./tsconfig.eslint.json",
  },
  rules: {
    "import/prefer-default-export": "off",
    // Required until https://github.com/inrupt/javascript-style-configs/pull/66 is closed
    "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
    '@typescript-eslint/naming-convention': [
        'error',
        {
            'selector': 'interface',
            'format': ['PascalCase'],
            'custom': {
                'regex': '^[A-Z]',
                'match': true
            }
        }
    ],
    "header/header": "off"
  },
};
