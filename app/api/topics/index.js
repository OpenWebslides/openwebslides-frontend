// @flow

import deleteFunction from './delete';
import get from './get';
import getAllByUserId from './getAllByUserId';
import getContent from './getContent';
import patchContent from './patchContent';
import post from './post';

const topicApi = {
  delete: deleteFunction,
  get,
  getAllByUserId,
  getContent,
  patchContent,
  post,
};

export default topicApi;
