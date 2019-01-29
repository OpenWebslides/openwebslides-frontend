// @flow

import { type Saga } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';
import platform from 'modules/platform';

import * as a from '../../actionTypes';
import * as m from '../../model';

const apiGenderTypesMap = {
  [m.genderTypes.MALE]: 'male',
  [m.genderTypes.FEMALE]: 'female',
  [m.genderTypes.OTHER]: 'other',
};

const apiRoleTypesMap = {
  [m.roleTypes.LEARNER]: 'learner',
  [m.roleTypes.TEACHER]: 'teacher',
  [m.roleTypes.COTEACHER]: 'coteacher',
};

const apiPatch = function* (action: a.ApiPatchAction): Saga<{ id: string }> {
  const {
    id,
    name,
    locale,
    alertEmails,
    currentPassword,
    password,
    age,
    gender,
    role,
    country,
  } = action.payload;
  const userAuth: ?platform.model.UserAuth = yield select(platform.selectors.getUserAuth);
  if (userAuth == null) throw new UnsupportedOperationError(`Not signed in.`);

  let genderType: ?string = null;
  if (gender != null) genderType = apiGenderTypesMap[gender];

  let roleType: ?string = null;
  if (role != null) roleType = apiRoleTypesMap[role];

  const responseData: ApiResponseData = yield call(
    api.users.patch,
    id,
    name,
    locale,
    alertEmails,
    currentPassword,
    password,
    age,
    genderType,
    roleType,
    country,
    userAuth.apiToken,
  );
  if (responseData.body == null) throw new UnexpectedHttpResponseError();

  return { id: responseData.body.data.id };
};

export default apiPatch;
