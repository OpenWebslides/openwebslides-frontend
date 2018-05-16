// @flow

import { combineReducers } from 'redux';

import topics from 'modules/topics';
import contentItems from 'modules/content-items';
import feed from 'modules/feed';
import users from 'modules/users';
import authentication from 'modules/authentication';
import slideStyling from 'modules/slide-styling';
import api from 'modules/api';

// Don't forget to edit types/state.js when a new state part is added here.
const modulesReducer = combineReducers({
  topics: topics.reducer,
  feed: feed.reducer,
  users: users.reducer,
  contentItems: contentItems.reducer,
  authentication: authentication.reducer,
  slideStyling: slideStyling.reducer,
  api: api.reducer,
});

export default modulesReducer;
