// @flow

import deleteToken from './delete';
import post from './post';

const tokenApi = {
  delete: deleteToken,
  post,
};

export default tokenApi;
