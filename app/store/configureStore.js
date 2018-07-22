// @flow
/**
 * Sets up the redux store, including middelware and access for redux-devtools browser extension.
 */

// Redux
import { createStore, applyMiddleware, type Store } from 'redux';
// Redux-flash
import { middleware as flashMiddleware } from 'redux-flash';
// Redux-saga
import createSagaMiddleware from 'redux-saga';
// Connected-react-router
import { createBrowserHistory, type BrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// DevTools
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const configureStore = (): {store: Store<*, *>, history: BrowserHistory } => {
  const history = createBrowserHistory();
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    connectRouter(history)(rootReducer),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(flashMiddleware()),
      applyMiddleware(routerMiddleware(history)),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return { store, history };
};

export default configureStore;
