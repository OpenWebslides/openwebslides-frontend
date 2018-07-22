// @flow
/* eslint-disable import/no-internal-modules */
// ^ note: make exception to the rule of only importing entire modules to avoid dependency cycles

import { combineReducers } from 'redux';

import apiRequestsStatusReducer from 'modules/apiRequestsStatus/reducer';
import contentItemsReducer from 'modules/contentItems/reducer';
import feedReducer from 'modules/feed/reducer';
import platformReducer from 'modules/platform/reducer';
import topicsReducer from 'modules/topics/reducer';
import usersReducer from 'modules/users/reducer';

// Don't forget to edit types/state.js when a new state part is added here.
const modulesReducer = combineReducers({
  apiRequestsStatus: apiRequestsStatusReducer,
  contentItems: contentItemsReducer,
  feed: feedReducer,
  platform: platformReducer,
  topics: topicsReducer,
  users: usersReducer,
});

export default modulesReducer;
