// @flow
/**
 * Sets up the root reducer.
 */

import { combineReducers } from 'redux';

import modulesReducer from './modulesReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  modules: modulesReducer,
  error: errorReducer,
});

export default rootReducer;
