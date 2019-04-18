// @flow

import { type Saga } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import { type ApiResponseData } from 'lib/ApiConnection';
import platform from 'modules/platform';

import * as a from '../../actionTypes';

const apiPost = function* (action: a.ApiPostAction): Saga<{ id: string }> {
  const { userId, title, description, rootContentItemId } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  const responseData: ApiResponseData = yield call(
    api.topics.post, title, description, rootContentItemId, userId, userAuth.accessToken,
  );
  if (responseData.body == null) throw new UnexpectedHttpResponseError();

  return { id: responseData.body.data.id };
};

export default apiPost;
