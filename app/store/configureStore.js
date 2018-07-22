// @flow
/**
 * Sets up the redux store, including middelware and access for redux-devtools browser extension.
 */

// import _ from 'lodash';
import { createStore, applyMiddleware, type Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { middleware as flashMiddleware } from 'redux-flash';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

// import { saveState, loadState } from 'lib/localStorage';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const history = createBrowserHistory();

const configureStore = (): Store<*, *> => {
  // const persistedState = loadState();
  const sagaMiddleware = createSagaMiddleware();
  const rootReducerWithHistory = connectRouter(history)(rootReducer);

  const store = createStore(rootReducerWithHistory, /* persistedState, */ composeWithDevTools(
    applyMiddleware(sagaMiddleware),
    applyMiddleware(flashMiddleware()),
    applyMiddleware(routerMiddleware(history)),
  ));

  // Persists state to localStorage
  /* #TODO re-enable for platform module
  store.subscribe(
    _.throttle((): void => {
      saveState({
        modules: {
          authentication: store.getState().modules.authentication,
        },
      });
    }, 1000),
  );
  */

  sagaMiddleware.run(rootSaga);

  return store;
};

export { history };
export default configureStore;
