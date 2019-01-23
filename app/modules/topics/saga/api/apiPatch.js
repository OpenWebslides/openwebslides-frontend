// @flow

import { type Saga } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';
import platform from 'modules/platform';

import * as a from '../../actionTypes';
import * as m from '../../model';

const apiAccessTypesMap = {
  [m.accessTypes.PUBLIC]: 'public',
  [m.accessTypes.PROTECTED]: 'protected',
  [m.accessTypes.PRIVATE]: 'private',
};

const apiPatch = function* (action: a.ApiPatchAction): Saga<{ id: string }> {
  const { id, title, description, access } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  const responseData: ApiResponseData = yield call(
    api.topics.patch,
    id,
    title,
    description,
    apiAccessTypesMap[access],
    userAuth.apiToken,
  );
  if (responseData.body == null) throw new UnexpectedHttpResponseError();

  return { id: responseData.body.data.id };
};

export default apiPatch;
