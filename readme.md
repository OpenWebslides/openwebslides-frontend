# openwebslides-frontend

React app for the OpenWebslides open-source co-creation platform.

## How to...

### ... run the webpack dev server:

```
yarn run dev-server
```

### ... run tests:

Minimal output:
```
yarn run test
```

Verbose test output + coverage report:
```
yarn run test-report
```

### ... run eslint check:

```
yarn run lint
```

### ... run flow check:

```
yarn run flow
```

### ... run all tests & checks at once:

```
yarn run precommit
```

Note: this happens automatically before every git commit. `yarn run precommit` needs to pass before the code can be committed.

## Note on `flow-typed`

Please keep this up-to-date by running `flow-typed install` every time `package.json` is updated.

## Good to read:

- [Flow for React docs](https://flow.org/en/docs/react/)
- [Three rules for structuring (Redux) applications](https://jaysoo.ca/2016/02/28/organizing-redux-application/)
