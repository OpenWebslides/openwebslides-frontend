// @flow

import { call, put, select } from 'redux-saga/effects';
import authentication from 'modules/authentication';

import * as t from '../../actionTypes';
import Api from '../../api';
import { addToState } from '../../actions';

const { getToken } = authentication.selectors;

export const apiPostTopicSaga = function* (action: t.ApiPostTopicAction): Generator<*, *, *> {
  try {
    const { userId, title, description } = action.payload;
    const token = yield select(getToken);

    yield call(Api.post, userId, title, description, token); // TODO: add rootContentItemId later
    yield put(addToState('testtestID', userId, title, description, 'w4lg2u0p1h'));
  }
  catch (error) {
    // TODO
  }
};
