// @flow

import deleteFunction from './delete';
import post from './post';

const tokenApi = {
  delete: deleteFunction,
  post,
};

export default tokenApi;
