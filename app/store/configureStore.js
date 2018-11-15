// @flow

/**
 * Sets up the redux store, including middelware and access for redux-devtools browser extension.
 */

// Redux
import { createStore, applyMiddleware, type Store } from 'redux';
// Redux-flash
import { middleware as flashMiddleware } from 'redux-flash';
// Redux-persist
import { persistStore, persistReducer } from 'redux-persist';
// $FlowFixMe redux-persist had to be ignored in .flowconfig because it caused unsurpressable errors
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// eslint-disable-next-line flowtype/type-import-style
import type { PersistConfig, Persistor } from 'redux-persist/src/types';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
// Redux-saga
import createSagaMiddleware from 'redux-saga';
// Connected-react-router
import createBrowserHistory, { type BrowserHistory } from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
// DevTools
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

import { type ModulesAction, type AppState } from 'types/redux';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const configureStore = (): {
  store: Store<AppState, ModulesAction>,
  history: BrowserHistory,
  persistor: Persistor,
} => {
  const history = createBrowserHistory();
  const persistConfig: PersistConfig = {
    // LocalStorage key
    key: 'root',
    // Storage object
    storage,
    // Only persist state.modules, not the rest of the state; further filtering done below.
    whitelist: ['modules'],
    // Merge state.modules, don't overwrite it.
    stateReconciler: autoMergeLevel2,
    transforms: [
      // Only persist state.modules.platform, not the rest of the modules.
      createWhitelistFilter('modules', ['platform']),
    ],
  };
  const sagaMiddleware = createSagaMiddleware();

  const flashOptions = {
    timeout: 5000,
  };

  const store = createStore(
    connectRouter(history)(persistReducer(persistConfig, rootReducer)),
    composeWithDevTools(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(flashMiddleware(flashOptions)),
      applyMiddleware(routerMiddleware(history)),
    ),
  );

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, history, persistor };
};

export default configureStore;
