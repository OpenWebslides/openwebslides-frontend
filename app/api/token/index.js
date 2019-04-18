// @flow

import deleteToken from './delete';
import patch from './patch';
import post from './post';

const tokenApi = {
  delete: deleteToken,
  patch,
  post,
};

export default tokenApi;
