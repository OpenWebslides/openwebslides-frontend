// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';
import { type ApiResponseData } from 'lib/ApiRequest';

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

// TODO: country enumeration
const apiCountryTypesMap = {
  [m.countryTypes.BELGIUM]: 'BE',
};

const apiPost = function* (action: a.ApiPostAction): Saga<{ id: string }> {
  const { email, name, password, tosAccepted, age, gender, role, country } = action.payload;

  const responseData: ApiResponseData = yield call(
    api.users.post,
    email,
    name,
    password,
    tosAccepted,
    age,
    apiGenderTypesMap[gender],
    apiRoleTypesMap[role],
    apiCountryTypesMap[country],
  );
  if (responseData.body == null) throw new UnexpectedHttpResponseError();

  return { id: responseData.body.data.id };
};

export default apiPost;
