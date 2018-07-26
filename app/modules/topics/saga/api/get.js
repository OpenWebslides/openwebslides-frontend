// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';

import * as a from '../../actionTypes';
import type { Topic } from '../../model';
import { addToState, setItemsInState } from '../../actions';

export const apiGetSaga = function* (action: a.GetAction): Saga<void> {
  try {
    const response = yield call(api.topics.get, action.payload.id);

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

export const apiGetAllByUserIdSaga = function* (
  action: a.GetAllByUserIdAction,
): Saga<void> {
  try {
    const response = yield call(api.topics.getAllByUserId, action.payload.userId);

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
