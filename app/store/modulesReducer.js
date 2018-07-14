// @flow

import { combineReducers } from 'redux';

import topics from 'modules/topics';
import contentItems from 'modules/contentItems';
import feed from 'modules/feed';
import sidebars from 'modules/sidebars';
import users from 'modules/users';
import authentication from 'modules/authentication';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import history from 'modules/history';

// Don't forget to edit types/state.js when a new state part is added here.
const modulesReducer = combineReducers({
  topics: topics.reducer,
  feed: feed.reducer,
  sidebars: sidebars.reducer,
  users: users.reducer,
  contentItems: contentItems.reducer,
  authentication: authentication.reducer,
  apiRequestsStatus: apiRequestsStatus.reducer,
  history: history.reducer,
});

export default modulesReducer;
