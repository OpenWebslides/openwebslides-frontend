// @flow

import { call, select } from 'redux-saga/effects';
import authentication from 'modules/authentication';

import * as t from '../../actionTypes';
import Api from '../../api';

const { getToken } = authentication.selectors;

export const apiPostTopicSaga = function* (action: t.ApiPostTopicAction): Generator<*, *, *> {
  try {
    const { userId, title, description } = action.payload;
    const token = yield select(getToken);

    yield call(Api.post, userId, title, description, token); // TODO: add rootContentItemId later
  }
  catch (error) {
    // TODO
  }
};
