// @flow

import apiDelete from './apiDelete';
import apiGet from './apiGet';
import apiPatch from './apiPatch';
import apiPost from './apiPost';
import apiPostFork from './apiPostFork';

const apiSagaActions = {
  apiDelete,
  apiGet,
  apiPatch,
  apiPost,
  apiPostFork,
};

export default apiSagaActions;
