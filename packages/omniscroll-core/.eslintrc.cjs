module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:astro/recommended",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "react/react-in-jsx-scope": "off",
    },
};
