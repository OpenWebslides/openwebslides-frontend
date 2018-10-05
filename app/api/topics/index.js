// @flow

import deleteFunction from './delete';
import get from './get';
import getAllByUserId from './getAllByUserId';
import getContent from './getContent';
import patch from './patch';
import patchContent from './patchContent';
import post from './post';
import postFork from './postFork';

const topicApi = {
  delete: deleteFunction,
  get,
  getAllByUserId,
  getContent,
  patch,
  patchContent,
  post,
  postFork,
};

export default topicApi;
