// @flow

import apiDelete from './apiDelete';
import apiGet from './apiGet';
import apiGetAllByUserId from './apiGetAllByUserId';
import apiPost from './apiPost';

const apiSagaActions = {
  apiDelete,
  apiGet,
  apiGetAllByUserId,
  apiPost,
};

export default apiSagaActions;
