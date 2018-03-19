// @flow
/**
 * Sets up the redux store, including middelware and access for redux-devtools browser extension.
 */

import { createStore, applyMiddleware, combineReducers } from 'redux';
import type { Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const configureStore = (): Store<*, *> => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    combineReducers({
      rootReducer,
      form: formReducer,
    }),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
    ),
  );
  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
