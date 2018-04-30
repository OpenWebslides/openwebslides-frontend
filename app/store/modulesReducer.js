// @flow

import { combineReducers } from 'redux';

import topics from 'modules/topics';
import contentItems from 'modules/content-items';
import feed from 'modules/feed';
import users from 'modules/users';
import authentication from 'modules/authentication';

// Don't forget to edit types/state.js when a new state part is added here.
const modulesReducer = combineReducers({
  topics: topics.reducer,
  feed: feed.reducer,
  users: users.reducer,
  contentItems: contentItems.reducer,
  authentication: authentication.reducer,
});

export default modulesReducer;
