// @flow
/**
 * Sets up the root reducer.
 */

import { combineReducers } from 'redux';

import modulesReducer from './modulesReducer';
import errorReducer from './errorReducer';

// Don't forget to edit types/state.js when a new state part is added here.
const rootReducer = combineReducers({
  modules: modulesReducer,
  error: errorReducer,
});

export default rootReducer;
