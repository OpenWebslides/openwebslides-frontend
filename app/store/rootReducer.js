// @flow
/**
 * Sets up the root reducer.
 */

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducer as flashReducer } from 'redux-flash';

import modulesReducer from './modulesReducer';
import errorReducer from './errorReducer';


// Don't forget to edit types/state.js when a new state part is added here.
const rootReducer = combineReducers({
  modules: modulesReducer,
  form: formReducer,
  flash: flashReducer,
  error: errorReducer,
});

export default rootReducer;
