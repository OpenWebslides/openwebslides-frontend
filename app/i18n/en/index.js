// @flow

import authentication from './namespaces/authentication';
import common from './namespaces/common';
import errors from './namespaces/errors';
import editor from './namespaces/editor';
import global from './namespaces/global';
import feed from './namespaces/feed';
import flash from './namespaces/flash';
import topics from './namespaces/topics';

const index = {
  authentication,
  common,
  editor,
  errors,
  feed,
  flash,
  global,
  topics,
};

export default index;
