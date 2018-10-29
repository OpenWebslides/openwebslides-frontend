// @flow

/* eslint-disable sort-imports */

/**
 * Sets up the root reducer.
 */

import { combineReducers } from 'redux';
import { reducer as flashReducer } from 'redux-flash';

import modulesReducer from './modulesReducer';

// Don't forget to edit types/redux.js when a new state part is added here.
const rootReducer = combineReducers({
  flash: flashReducer,
  modules: modulesReducer,
});

export default rootReducer;
