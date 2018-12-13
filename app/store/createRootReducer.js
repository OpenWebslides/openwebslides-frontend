// @flow

/* eslint-disable sort-imports */

/**
 * Sets up the root reducer.
 */

import { combineReducers } from 'redux';
import { reducer as flashReducer } from 'redux-flash';
import { connectRouter } from 'connected-react-router';
import { type BrowserHistory } from 'history/createBrowserHistory';

import modulesReducer from './modulesReducer';

// Don't forget to edit types/redux.js when a new state part is added here.
const createRootReducer = (history: BrowserHistory) => combineReducers({
  flash: flashReducer,
  modules: modulesReducer,
  router: connectRouter(history),
});

export default createRootReducer;
