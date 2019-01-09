# Open Webslides [![Travis](https://travis-ci.org/OpenWebslides/openwebslides-frontend.svg?branch=master)](https://travis-ci.org/OpenWebslides/openwebslides-frontend) [![Coverage Status](https://coveralls.io/repos/github/OpenWebslides/openwebslides-frontend/badge.svg)](https://coveralls.io/github/OpenWebslides/openwebslides-frontend)

React app for the OpenWebslides open-source co-creation platform.

## How to...

- Run the webpack dev server: `yarn run dev-server`
- Run the webpack dev server using a non-default API server: `yarn run dev-server --env.API_URL=http://my-server.com/api`
- Run tests:
  - Minimal output: `yarn run test`
  - Verbose test output + coverage report: `yarn run test-report`
- Run ESLint check: `yarn run lint`
- Run Flow check: `yarn run flow`

## Note on pre-commit & pre-push hooks

`package.json` contains a `precommit` and a `prepush` script, which are automatically executed on git commit / push using [Husky](https://github.com/typicode/husky). They can also be executed manually using `yarn run precommit` and `yarn run prepush`, respectively.

The following checks need to pass in order for a commit to succeed:
- Code contains no eslint errors
- Code contains no flow errors

The following checks need to pass in order for a push to succeed:
- There are no failing tests

## Note on `flow-typed`

Please keep this up-to-date by running `flow-typed install` every time `package.json` is updated.

## Good to read:

- [Flow for React docs](https://flow.org/en/docs/react/)
- [Three rules for structuring (Redux) applications](https://jaysoo.ca/2016/02/28/organizing-redux-application/)
