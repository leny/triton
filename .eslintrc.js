/* leny/triton
 *
 * /.eslintrc.js
 */

module.exports = {
    extends: "@leny",
    parser: "@babel/eslint-parser",
    parserOptions: {
        babelOptions: {
            presets: ["@babel/preset-react"],
        },
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
