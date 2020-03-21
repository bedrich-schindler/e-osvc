module.exports = {
  extends: [
    '@visionappscz/stylelint-config-visionapps',
    '@visionappscz/stylelint-config-visionapps-order',
    'stylelint-config-css-modules',
  ],
  rules: {
    'at-rule-no-unknown': [
      true, {
        ignoreAtRules: [
          'content',
          'each',
          'else',
          'else if',
          'error',
          'function',
          'if',
          'include',
          'mixin',
          'return',
        ],
      },
    ],
    indentation: 2,
  },
};
