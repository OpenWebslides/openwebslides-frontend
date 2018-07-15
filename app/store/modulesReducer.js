// @flow

import { combineReducers } from 'redux';

import apiRequestsStatus from 'modules/apiRequestsStatus';
import authentication from 'modules/authentication';
import contentItems from 'modules/contentItems';
import feed from 'modules/feed';
import history from 'modules/history';
import sidebars from 'modules/sidebars';
import topics from 'modules/topics';
import users from 'modules/users';

// Don't forget to edit types/state.js when a new state part is added here.
const modulesReducer = combineReducers({
  apiRequestsStatus: apiRequestsStatus.reducer,
  authentication: authentication.reducer,
  contentItems: contentItems.reducer,
  feed: feed.reducer,
  history: history.reducer,
  sidebars: sidebars.reducer,
  topics: topics.reducer,
  users: users.reducer,
});

export default modulesReducer;
