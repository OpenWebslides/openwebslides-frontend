module.exports = {
  'extends': [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:promise/recommended',
  ],
  'env': {
    // Don't throw error when using global browser variables such as 'document' or 'window'.
    'browser': true,
    // Don't throw error when using jest functions such as 'descibe' or 'it'.
    'jest': true,
  },
  'plugins': [
    // ESLint checking for Flow.
    'flowtype',
    // ESLint checking for Jest tests.
    'jest',
    // ESLint checking for correct use of Promise / async features.
    'promise',
  ],
  'settings': {
    // Temporary workaround for https://github.com/benmosher/eslint-plugin-import/issues/793 #TODO
    'import/core-modules': [
      'redux-saga/effects',
    ],
    // Enables eslint-plugin-import to check import paths using webpack resolver aliases.
    'import/resolver': {
      'webpack': {
        'config': './webpack.resolver.dummy.config.js',
      },
    },
  },
  'rules': {

    // Allow programmer to decide which formatting is more readable on a case-by-case basis.
    'arrow-body-style': 'off',

    // Enforce consistent use of parentheses around arrow function parameters.
    'arrow-parens': [
      'error',
      'always',
    ],

    // 'stroustrup' is the only style that allows for comments between the 'if' and the 'else' block.
    'brace-style': [
      'error',
      'stroustrup',
    ],

    // Only require function expressions to be named if the name can't be derived from the variable they're assigned to.
    'func-names': [
      'error',
      'as-needed',
    ],

    // Enforce consistent use of function expressions over function declarations.
    'func-style': [
      'error',
      'expression',
    ],

    // Allow programmer to decide which formatting is more readable on a case-by-case basis.
    'function-paren-newline': 'off',

    // #TODO set this to 'warn' as soon as we've implemented proper logging.
    'no-console': 'off',

    // Allow programmer to decide which formatting is more readable on a case-by-case basis.
    'no-else-return': 'off',

    // Disallow more than one empty line between code blocks.
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 1,
        'maxEOF': 1,
        'maxBOF': 0,
      },
    ],

    // Turn this off so that we can use flowtype/no-unused-expressions instead.
    'no-unused-expressions': 'off',

    // Allow some common React/Redux function arguments to go unused, to allow copy/pasting boilerplate code.
    'no-unused-vars': [
      'error',
      {
        'argsIgnorePattern': 'props|state|dispatch|action',
      },
    ],

    // `max-len` already takes care of too many object props on a single line.
    'object-curly-newline': 'off',

    // Flow currently does not support typing destructured objects.
    // See https://github.com/facebook/flow/issues/235 #TODO
    'prefer-destructuring': 'off',

    // Discourage the use of Object.assign() in reducers; prefer using spread operator.
    'prefer-object-spread': 'error',

    // Require quotes around numbers used as props,
    // for compatibility with external libraries which may not support unquoted numbers (e.g. i18next).
    'quote-props': [
      'error',
      'as-needed',
      {
        'numbers': true,
      },
    ],

    // Allow template literals in addition to single quoted strings.
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true,
      },
    ],

    // Consistency with airbnb's 'comma-dangle' rule.
    'flowtype/delimiter-dangle': [
      'error',
      'always-multiline',
    ],

    // Consistency with airbnb's 'no-dupe-keys' rule.
    'flowtype/no-dupe-keys': 'error',

    // Disallow $FlowFixMe comments that don't have a reason specified.
    'flowtype/no-flow-fix-me-comments': [
      'error',
      ' .+', // Allows $FlowFixMe followed by a space and one or more characters to pass without error
    ],

    // Prevent typos.
    'flowtype/no-primitive-constructor-types': 'error',

    // Extends the no-unused-expressions rule to ignore flow type cast expressions.
    'flowtype/no-unused-expressions': [
      'error',
      {
        'allowShortCircuit': false,
        'allowTernary': false,
        'allowTaggedTemplates': false,
      },
    ],

    // Prevent lazy typing.
    'flowtype/no-weak-types': 'error',

    // Enforce delimiter consistency.
    'flowtype/object-type-delimiter': 'error',

    // Enabling this would be better but exact types still have some issues #TODO
    // example: https://github.com/facebook/flow/issues/2405
    'flowtype/require-exact-type': 'off',

    // Enforce explicitly typing parameters.
    'flowtype/require-parameter-type': [
      'error',
      {
        'excludeArrowFunctions': 'expressionsOnly',
      },
    ],

    // Enforce explicitly typing function return values.
    'flowtype/require-return-type': [
      'error',
      'always',
      {
        'annotateUndefined': 'always',
        'excludeArrowFunctions': 'expressionsOnly',
      },
    ],

    // Enforce using flow in all JS files.
    'flowtype/require-valid-file-annotation': [
      'error',
      'always',
      {
        'annotationStyle': 'line',
      },
    ],

    // Enforce explicitly typing variables,
    // except for 'const' since in that case the type is immediately obvious from the initial value.
    // Excluding 'const' also allows us to skip lengthy / duplicate type information when using function expressions.
    'flowtype/require-variable-type': [
      'error',
      {
        'excludeVariableTypes': {
          'const': true,
        },
      },
    ],

    // Consistency with airbnb's 'semi' rule.
    'flowtype/semi': 'error',

    // Encourage placing default exports of components on a separate line at the bottom of the file.
    'import/exports-last': 'error',

    // Rule causes conflicts with module structure.
    'import/prefer-default-export': 'off',

    // #TODO look into enabling this if it becomes possible to exclude flow `import type` statements from the max count
    // See https://github.com/benmosher/eslint-plugin-import/issues/1136
    // 'import/max-dependencies': [
    //  'error',
    //  {
    //    'max': 10
    //  }
    //],

    // Encourage placing default exports of components on a separate line at the bottom of the file.
    'import/no-anonymous-default-export': 'error',

    // #TODO Currently not usable due to it not making an exception for flow type imports.
    // See https://github.com/benmosher/eslint-plugin-import/issues/1098
    'import/no-cycle': 'off',

    // Enforce correct use of module index files;
    // prohibit paths that contain more than one non-(dot|double-dot) part, except for those whitelisted below.
    // #TODO update whitelist while refactoring modules
    'import/no-internal-modules': [
      'error',
      {
        'allow': [
          'redux-saga/**',
          'assets/**',
          'config/**',
          'core-components/**',
          'i18n/**',
          'pages/**',
          'store/**',
          'types/error',
          'types/model',
          'types/state',
          'modules/*',
          'helpers/*',
          'lib/*',
        ],
      },
    ],

    // Disallow importing a module without assigning it to a variable.
    'import/no-unassigned-import': [
      'error',
      {
        'allow': ['**/*.css', '**/*.less', '**/*.scss'],
      },
    ],

    // Enforce consistend ordering and spacing of imports.
    'import/order': [
      'error',
      {
        'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],

    // Enforce using ES2017 async/await syntax for asynchronous functionality.
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',

    // Doesn't play wel with semantic-ui-react; #TODO look for a way to fix this; perhaps write wrapper for label?
    'jsx-a11y/label-has-for': 'off',

    // Currently doesn't work correctly in combination with Flow.
    // See https://github.com/yannickcr/eslint-plugin-react/issues/1593
    // #TODO delete this override as soon as the above issue is resolved
    'react/default-props-match-prop-types': 'off',

    // Always explicitly write out a boolean property's value
    // for better readability / consistency with other properties.
    'react/jsx-boolean-value': [
      'error',
      'always',
    ],

    // Consistently use .js extensions for all JavaScript files no matter their content;
    // this prevents files from having to be renamed if their content changes and JSX is added / removed.
    'react/jsx-filename-extension': [
      'error',
      {
        'extensions': ['.js'],
      },
    ],

    // Prevent unnecessary re-rendering by never using .bind() or lambda's in jsx properties;
    // use classes with property initializers instead.
    'react/jsx-no-bind': [
      'error',
      {
        'ignoreRefs': false,
        'allowArrowFunctions': false,
        'allowFunctions': false,
        'allowBind': false,
      },
    ],

    // Currently too strict to be usable.
    // #TODO See https://github.com/yannickcr/eslint-plugin-react/issues/1848
    'react/jsx-one-expression-per-line': 'off',

    // Generates false positives when props are immediately passed to other function
    // Example: in a mapStateToProps function where prop is passed to selector function
    'react/no-unused-prop-types': 'off',

    // Turn off forbidDefaultForRequired, since it doesn't work well with the way Flow handles defaultProps.
    'react/require-default-props': [
      'error',
      {
        'forbidDefaultForRequired': false,
      },
    ],
  },
  'overrides': [
    {
      'files': [
        '*.test.js',
      ],
      'rules': {
        'max-len': 'off',
        'padded-blocks': 'off',
        'flowtype/no-weak-types': 'off',
        'import/max-dependencies': 'off',
        // #TODO check https://github.com/jest-community/eslint-plugin-jest/issues/113
        'jest/consistent-test-it': ['error', { 'fn': 'test', 'withinDescribe': 'it' }],
        'jest/lowercase-name': ['error', { 'ignore': ['describe'] }],
        'jest/no-disabled-tests': 'error',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/no-jasmine-globals': 'error',
        'jest/no-jest-import': 'error',
        'jest/no-large-snapshots': 'error',
        'jest/no-test-prefixes': 'error',
        'jest/prefer-expect-assertions': 'off',
        'jest/prefer-to-be-null': 'error',
        'jest/prefer-to-be-undefined': 'error',
        'jest/prefer-to-have-length': 'error',
        'jest/valid-describe': 'error',
        'jest/valid-expect-in-promise': 'error',
        'jest/valid-expect': 'error',
      },
    },
  ],
};