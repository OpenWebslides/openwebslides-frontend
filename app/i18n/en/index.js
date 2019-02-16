// @flow

import alerts from './alerts';
import api from './api';
import common from './common';
import contentItems from './contentItems';
import errors from './errors';
import feedItems from './feedItems';
import flash from './flash';
import globalTranslations from './global'; // note: cannot be named 'global' bc of naming conflict
import library from './library';
import modals from './modals';
import platform from './platform';
import pullRequests from './pullRequests';
import settings from './settings';
import topics from './topics';
import users from './users';

const index = {
  alerts,
  api,
  common,
  contentItems,
  errors,
  feedItems,
  flash,
  global: globalTranslations,
  library,
  modals,
  platform,
  pullRequests,
  settings,
  topics,
  users,
};

export default index;
