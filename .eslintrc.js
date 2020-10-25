module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": ["standard",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "settings":  {
    "react":  {
      "version":  "detect"  
    }
  },
  "rules": {
    "no-console": 0,
    "@typescript-eslint/member-delimiter-style": ["error", {
      "multiline": {
        "delimiter": "comma",   
        "requireLast": false
      },
      "singleline": {
        "delimiter": "comma",  
        "requireLast": false
      }
    }],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/no-explicit-any": 1,
    "@typescript-eslint/no-unused-vars": ["off"]
  }
}