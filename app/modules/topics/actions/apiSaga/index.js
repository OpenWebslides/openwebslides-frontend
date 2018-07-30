// @flow

import apiDelete from './apiDelete';
import apiGet from './apiGet';
import apiGetAllByUserId from './apiGetAllByUserId';
import apiGetContent from './apiGetContent';
import apiPatchContent from './apiPatchContent';
import apiPost from './apiPost';

const apiSagaActions = {
  apiDelete,
  apiGet,
  apiGetAllByUserId,
  apiGetContent,
  apiPatchContent,
  apiPost,
};

export default apiSagaActions;
