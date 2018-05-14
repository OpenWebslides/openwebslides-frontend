// @flow
/**
 * Sets up the redux store, including middelware and access for redux-devtools browser extension.
 */

import { createStore, applyMiddleware } from 'redux';
import type { Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import _ from 'lodash';
import { middleware as flashMiddleware } from 'redux-flash';

import { saveState, loadState } from 'lib/localStorage';

// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const configureStore = (): Store<*, *> => {
  const persistedState = loadState();
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, persistedState, composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(flashMiddleware()),
  ));

  // Persists state to localStorage
  store.subscribe(
    _.throttle((): void => {
      saveState({
        modules: {
          authentication: store.getState().modules.authentication,
        },
      });
    }, 1000),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
