// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';

import * as a from '../../actionTypes';

const apiPost = function* (action: a.ApiPostAction): Saga<{ id: string }> {
  const { email, name, password, tosAccepted, age, gender, role, country } = action.payload;

  const responseData: ApiResponseData = yield call(
    api.users.post, email, name, password, tosAccepted, age, gender, role, country,
  );
  if (responseData.body == null) throw new UnexpectedHttpResponseError();

  return { id: responseData.body.data.id };
};

export default apiPost;
