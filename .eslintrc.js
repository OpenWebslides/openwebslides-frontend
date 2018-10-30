const { rules: airbnbBaseErrorsRules } = require('eslint-config-airbnb-base/rules/errors');
const { rules: airbnbBaseStyleRules } = require('eslint-config-airbnb-base/rules/style');
const { rules: airbnbBaseBestPracticeRules } = require('eslint-config-airbnb-base/rules/best-practices');

module.exports = {
  'extends': [
    'airbnb',
    'plugin:jest/recommended',
    'plugin:flowtype/recommended',
    'plugin:promise/recommended',
    'plugin:redux-saga/recommended',
  ],
  'env': {
    // Don't throw error when using global browser variables such as 'document' or 'window'.
    'browser': true,
    // Don't throw error when using jest functions such as 'descibe' or 'it'.
    'jest': true,
  },
  'plugins': [
    // ESLint checking for experimental features enabled using babel.
    'babel',
    // ESLint checking for Flow.
    'flowtype',
    // ESLint checking for Jest tests.
    'jest',
    // ESLint checking for correct use of Promise / async features.
    'promise',
    // Eslint checking for correct use of redux-saga
    'redux-saga',
  ],
  'settings': {
    // Temporary workaround for https://github.com/benmosher/eslint-plugin-import/issues/793 #TODO
    'import/core-modules': [
      'redux-saga/effects',
      'redux-persist/integration/react',
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

    // Apply these eslint rules to the experimental JS features enabled by babel
    'babel/new-cap': airbnbBaseStyleRules['new-cap'],
    'babel/no-invalid-this': airbnbBaseBestPracticeRules['no-invalid-this'],
    'babel/object-curly-spacing': airbnbBaseStyleRules['object-curly-spacing'],
    'babel/quotes': ['error', 'single', { 'allowTemplateLiterals': true } ], // Use same override as for 'quotes' rule above
    'babel/semi': airbnbBaseStyleRules['semi'],
    // 'babel/no-unused-expressions': airbnbBaseBestPracticeRules['no-unused-expressions'], // conflicts with flowtype/no-unused-expressions
    'babel/valid-typeof': airbnbBaseErrorsRules['valid-typeof'],

    // Enforce consistency in using array types.
    'flowtype/array-style-complex-type': 'error',
    'flowtype/array-style-simple-type': 'error',

    // Consistency with airbnb's 'comma-dangle' rule.
    'flowtype/delimiter-dangle': [
      'error',
      'always-multiline',
    ],

    // Enforce empty line after flow annotation.
    'flowtype/newline-after-flow-annotation': 'error',

    // Consistency with airbnb's 'no-dupe-keys' rule.
    'flowtype/no-dupe-keys': 'error',

    // Disallow * type, since it is deprecated.
    'flowtype/no-existential-type': 'error',

    // Disallow $FlowFixMe comments that don't have a reason specified.
    'flowtype/no-flow-fix-me-comments': [
      'error',
      ' .+', // Allows $FlowFixMe followed by a space and one or more characters to pass without error
    ],

    // Enforce the use of $ReadOnlyArray instead of Array.
    'flowtype/no-mutable-array': 'error',

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
    'flowtype/no-weak-types': [
      'error',
      {
        // Disable this for 'mixed' since it is not a true weak type (in that invalid uses will still cause errors).
        'mixed': false,
      },
    ],

    // Enforce delimiter consistency.
    'flowtype/object-type-delimiter': 'error',

    // Require all types to be exact for both stricter and more intuitive type checking.
    'flowtype/require-exact-type': 'error',

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

    // Require flow types to be defined before anything else in a file.
    'flowtype/require-types-at-top': 'error',

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

    // Enforce flow type names starting with a capital letter.
    'flowtype/type-id-match': [
      'error',
      '^[A-Z][a-zA-Z0-9]+$'
    ],

    // Enforce consistent style of flow type imports.
    'flowtype/type-import-style': 'error',

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

    // Enforce correct use of module index files;
    // prohibit paths that contain more than one non-(dot|double-dot) part, except for those whitelisted below.
    // #TODO update whitelist while refactoring modules
    'import/no-internal-modules': [
      'error',
      {
        'allow': [
          // npm packages that require multiple levels in their import paths
          'history/**',
          'redux-saga/**',
          'redux-saga-test-plan/**',
          'redux-persist/**',
          // Folders that should allow multiple levels in their import paths
          'assets/**',
          // Folders that should allow a single extra level in their import path
          'components/*',
          'config/*',
          'forms/*',
          'i18n/*',
          'lib/*',
          'modules/*',
          'store/*',
          'types/*',
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

    // #TODO check https://github.com/jest-community/eslint-plugin-jest/issues/113

    // Enforce using `it` over `test` within a `describe` block;
    // enfore `test` over `it` outside of a `describe` block
    'jest/consistent-test-it': [
      'error',
      {
        'fn': 'test',
        'withinDescribe': 'it',
      },
    ],

    // Enforce making at least one 'expect' call in every test.
    'jest/expect-expect': [
      'error',
      {
        'assertFunctionNames': ['expect', 'expectSaga'],
      },
    ],

    // Enforce lowercase first letters of test descriptions.
    'jest/lowercase-name': [
      'error',
      {
        'ignore': ['describe'],
      },
    ],

    // Enforce consistency in jest method names.
    'jest/no-alias-methods': 'error',

    // Disallow disabling tests using .it.skip().
    'jest/no-disabled-tests': 'error',

    // Disallow disabling all tests except for one using .it.only().
    'jest/no-focused-tests': 'error',

    // Disallow duplicate titles within a single test suite.
    'jest/no-identical-title': 'error',

    // Disallow using undocumented/deprecated jasmine globals.
    'jest/no-jasmine-globals': 'error',

    // Disallow unnecessary jest imports.
    'jest/no-jest-import': 'error',

    // Limit the size of snapshots to be more manageable.
    'jest/no-large-snapshots': 'error',

    // Disallow the use of x and f prefixes to skip / focus tests; use .skip and .only instead.
    'jest/no-test-prefixes': 'error',

    // Enforce using .toStrictEqual() over .toEqual().
    'jest/prefer-strict-equal': 'error',

    // Enforce using .toBeNull() over .toBe(null).
    'jest/prefer-to-be-null': 'error',

    // Enforce using .toBeUndefined() over .toBe(undefined).
    'jest/prefer-to-be-undefined': 'error',

    // Enforce using .toHaveLength(x) over expect(var.lenght).toBe(x).
    'jest/prefer-to-have-length': 'error',

    // Enforce using .toMatchInlineSnapshot() over .toMatchSnapshot().
    'jest/prefer-inline-snapshots': 'error',

    // Enforce .toThrow() to specify an argument in order to more strictly validate thrown errors.
    'jest/require-tothrow-message': 'error',

    // Validate describe callback function.
    'jest/valid-describe': 'error',

    // Validate correct use of promises in tests.
    'jest/valid-expect-in-promise': 'error',

    // Validate correct use of expect().
    'jest/valid-expect': 'error',

    // Enforce using ES2017 async/await syntax for asynchronous functionality.
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',

    // Doesn't play well with semantic-ui-react; #TODO look for a way to fix this; perhaps write wrapper for label?
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

    // Saga errors are handled by modules/asyncRequests/lib/sagaWrapper
    // in a way that can't be detected by this rule.
    'redux-saga/no-unhandled-errors': 'off',
  },
  'overrides': [
    {
      'files': [
        '**/app/api/**/index.js',
        '**/app/errors/**/index.js',
        '**/app/i18n/**/index.js',
        '**/app/modules/*/actions/*/index.js',
        '**/app/modules/*/components/index.js',
        '**/app/modules/*/saga/**/index.js',
        '**/app/modules/*/selectors/index.js',
        '**/app/store/rootReducer.js',
        '**/app/store/modulesReducer.js',
        '**/app/store/rootSaga.js',
        '**/app/types/redux.js',
      ],
      'rules': {
        'sort-imports': 'error',
        'sort-keys': 'error',
        'flowtype/sort-keys': 'error',
      },
    },
    {
      'files': [
        '*.test.js',
      ],
      'rules': {
        'max-len': 'off',
        'padded-blocks': 'off',
        'flowtype/no-weak-types': 'off',
        'import/max-dependencies': 'off',
        'react/jsx-no-bind': 'off',
      },
    },
  ],
};
