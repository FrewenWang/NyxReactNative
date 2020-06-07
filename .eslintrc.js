module.exports = {
    root: true,
    extends: '@react-native-community',
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', "prettier"],
    rules: {
        "prettier/prettier": "error",
        "no-undef": 0,
        "no-useless-constructor": 0
    },
    extends: [
        // 'standard', //使用standard做代码规范
        "prettier",
        // "react-app",
        "plugin:prettier/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        }
    },
};
