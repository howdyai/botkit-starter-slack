module.exports = {
  "extends": [
    "eslint:all",
    "airbnb-base",
    "plugin:node/recommended"
  ],
  "env": {
    "es6": true,
    "browser": false,
    "node": true
  },
  //"parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins" : [
    "node"
  ],
  "settings": {
  },
  "rules": {
    "arrow-spacing"                                : [2, {"before": true, "after": true}],
    "camelcase"                                    : [2, {"properties": "never"}],
    "comma-dangle"                                 : [2, "never"],
    "comma-spacing"                                : [2, {"before": false, "after": true}],
    "constructor-super"                            : 2,
    "curly"                                        : 2,
    "dot-location"                                 : [2, "property"],
    "eol-last"                                     : 2,
    "eqeqeq"                                       : [2, "allow-null"],
    "func-style"                                   : [2, "expression", {"allowArrowFunctions": true}],
    "id-blacklist"                                 : [2, "moment"],
    "indent"                                       : [2, 2, {"SwitchCase": 1}],
    "linebreak-style"                              : [2, "unix"],
    "no-class-assign"                              : 2,
    "no-const-assign"                              : 2,
    "no-extra-bind"                                : 2,
    "no-extra-parens"                              : 2,
    "no-func-assign"                               : 2,
    "no-implicit-globals"                          : 2,
    "no-invalid-this"                              : 2,
    "no-lonely-if"                                 : 2,
    "no-multi-spaces"                              : 2,
    "no-multi-str"                                 : 2,
    "no-new-symbol"                                : 2,
    "no-self-assign"                               : 2,
    "no-shadow"                                    : 2,
    "no-spaced-func"                               : 2,
    "no-this-before-super"                         : 2,
    "no-trailing-spaces"                           : 2,
    "no-unreachable"                               : 2,
    "no-unused-vars"                               : [2, { "argsIgnorePattern": "^_" }],
    "no-useless-concat"                            : 2,
    "no-useless-constructor"                       : 2,
    "no-var"                                       : 2,
    "no-whitespace-before-property"                : 2,
    "object-curly-spacing"                         : [2, "always"],
    "object-shorthand"                             : 2,
    "operator-linebreak"                           : [2, "before"],
    "prefer-const"                                 : 2,
    "prefer-spread"                                : 2,
    "prefer-template"                              : 2,
    "quotes"                                       : [2, "single"],
    "semi"                                         : [2, "always"],
    "space-before-blocks"                          : 2,
    "space-before-function-paren"                  : [2, "never"],
    "space-infix-ops"                              : [2],
    "strict"                                       : 2
  }
};
