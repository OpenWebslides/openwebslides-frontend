// @flow

/* eslint-disable import/no-internal-modules, sort-imports */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

import { combineReducers } from 'redux';

import asyncRequestsReducer from 'modules/asyncRequests/reducer';
import contentItemsReducer from 'modules/contentItems/reducer';
import feedItemsReducer from 'modules/feedItems/reducer';
import platformReducer from 'modules/platform/reducer';
import topicsReducer from 'modules/topics/reducer';
import usersReducer from 'modules/users/reducer';

// Don't forget to edit types/state.js when a new state part is added here.
const modulesReducer = combineReducers({
  asyncRequests: asyncRequestsReducer,
  contentItems: contentItemsReducer,
  feedItems: feedItemsReducer,
  platform: platformReducer,
  topics: topicsReducer,
  users: usersReducer,
});

export default modulesReducer;
