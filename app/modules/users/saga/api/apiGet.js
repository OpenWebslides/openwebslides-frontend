// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiConnection';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiGet = function* (action: a.ApiGetAction): Saga<void> {
  const { id } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  const accessToken: ?string = (userAuth == null ? null : userAuth.accessToken);

  const responseData: ApiResponseData = yield call(api.users.get, id, accessToken);

  if (responseData.body == null) throw new UnexpectedHttpResponseError();

  const { attributes, relationships } = responseData.body.data;
  const user: m.User = {
    id,
    email: attributes.email,
    name: attributes.name,
    gravatarHash: attributes.gravatarHash,
    locale: attributes.locale,
    alertEmails: attributes.alertEmails,
    topicIds: relationships.topics.data.map((item: { type: string, id: string }) => item.id),
  };
  yield put(actions.setMultipleInState([user]));
};

export default apiGet;
