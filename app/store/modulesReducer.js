// @flow

import { combineReducers } from 'redux';

import topics from 'modules/topics';
import contentItems from 'modules/content-items';
import feedItems from 'modules/feed-items';

// Don't forget to edit types/state.js when a new state part is added here.
const modulesReducer = combineReducers({
  topics: topics.reducer,
  feedItems: feedItems.reducer,
  contentItems: contentItems.reducer,
});

export default modulesReducer;
