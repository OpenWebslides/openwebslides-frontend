// @flow

import { type Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';

const { putAndReturn } = asyncRequests.lib;

const update = function* (action: a.UpdateAction): Saga<void> {
  const { id, name, locale, alertEmails, age, gender, role, country } = action.payload;

  // Update the user in the backend
  yield call(putAndReturn, actions.apiPatch(
    id,
    name,
    locale,
    alertEmails,
    undefined,
    undefined,
    age,
    gender,
    role,
    country,
  ));

  // Fetch the user from the backend so the state is up-to-date
  yield call(putAndReturn, actions.fetch(id));
};

export default update;
