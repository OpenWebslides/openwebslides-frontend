// @flow

import deleteFunction from './delete';
import postSignin from './postSignin';

const tokenApi = {
  delete: deleteFunction,
  postSignin,
};

export default tokenApi;
