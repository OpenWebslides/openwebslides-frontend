// @flow

/* eslint-disable sort-imports */

import { combineReducers } from 'redux';

import { type ModulesAction } from 'types/redux';
import alerts from 'modules/alerts';
import asyncRequests from 'modules/asyncRequests';
import contentItems from 'modules/contentItems';
import errors from 'modules/errors';
import feedItems from 'modules/feedItems';
import platform from 'modules/platform';
import pullRequests from 'modules/pullRequests';
import topics from 'modules/topics';
import users from 'modules/users';

// Don't forget to edit types/redux.js when a new state part is added here.
const modulesReducer = combineReducers<_, ModulesAction>({
  alerts: alerts.reducer,
  asyncRequests: asyncRequests.reducer,
  contentItems: contentItems.reducer,
  errors: errors.reducer,
  feedItems: feedItems.reducer,
  platform: platform.reducer,
  pullRequests: pullRequests.reducer,
  topics: topics.reducer,
  users: users.reducer,
});

export default modulesReducer;
