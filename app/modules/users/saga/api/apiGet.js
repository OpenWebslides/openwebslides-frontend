// @flow

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

const apiGenderTypesMap = {
  male: m.genderTypes.MALE,
  female: m.genderTypes.FEMALE,
  other: m.genderTypes.OTHER,
};

const apiRoleTypesMap = {
  learner: m.roleTypes.LEARNER,
  teacher: m.roleTypes.TEACHER,
  coteacher: m.roleTypes.COTEACHER,
};

const apiGet = function* (action: a.ApiGetAction): Saga<void> {
  const { id } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  const token: ?string = (userAuth == null ? null : userAuth.apiToken);

  const responseData: ApiResponseData = yield call(api.users.get, id, token);

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
    age: attributes.age,
    gender: apiGenderTypesMap[attributes.gender],
    role: apiRoleTypesMap[attributes.role],
    country: attributes.country,
  };
  yield put(actions.setMultipleInState([user]));
};

export default apiGet;
