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

    yield call(Api.post, userId, title, description, token);
    yield put(addToState(userId, title, description));
  }
  catch (error) {
    // TODO
  }
};

/*
+id: Identifier,
  +userId: Identifier,
  +title: string,
  +description: string,
  +rootContentItemId: Identifier,
 */
