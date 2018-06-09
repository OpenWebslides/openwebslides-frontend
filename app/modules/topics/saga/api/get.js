// @flow

import { call, put } from 'redux-saga/effects';

import { TopicsApi } from 'lib/api';

import * as t from '../../actionTypes';
import type { Topic } from '../../model';

import { addToState, setItemsInState } from '../../actions';

export const apiGetSaga = function* (action: t.GetAction): Generator<*, *, *> {
  try {
    const response = yield call(TopicsApi.get, action.payload.id);

    const item = response.body.data;
    const userId = response.body.included[0].id;

    yield put(addToState(
      item.id,
      userId,
      item.attributes.title,
      item.attributes.description,
      'w4lg2u0p1h', // TODO: can't find in api call response
    ));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};

export const apiGetAllByUserIdByUserIdSaga = function* (
  action: t.GetAllByUserIdAction,
): Generator<*, *, *> {
  try {
    const response = yield call(TopicsApi.getAllByUserId, action.payload.userId);

    // eslint-disable-next-line flowtype/no-weak-types
    const data = response.body.data.map((item: Object): Topic => {
      return {
        id: item.id,
        userId: action.payload.userId,
        title: item.attributes.title,
        description: item.attributes.description,
        rootContentItemId: 'w4lg2u0p1h', // TODO: can't find in api call response
      };
    });

    yield put(setItemsInState(data));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
