// @flow

import { combineReducers } from 'redux';

import topics from 'modules/topics';

const modulesReducer = combineReducers({
  topics: topics.reducer,
});

export default modulesReducer;
