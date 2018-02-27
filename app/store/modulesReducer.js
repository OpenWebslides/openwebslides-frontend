// @flow

import { combineReducers } from 'redux';

import topics from 'modules/topics';

// Don't forget to edit types/state.js when a new state part is added here.
const modulesReducer = combineReducers({
  topics: topics.reducer,
});

export default modulesReducer;
