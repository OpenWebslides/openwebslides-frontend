// @flow

import { call, put } from 'redux-saga/effects';

import * as t from '../../actionTypes';

import Api from '../../api';
import type { Topic } from '../../model';

import { addToState, setItemsInState } from '../../actions';

export const apiGetTopicSaga = function* (action: t.GetAction): Generator<*, *, *> {
  try {
    const response = yield call(Api.get, action.payload.id);

    const item = response.body.data;

    yield put(addToState(
      item.id,
      '1',
      item.attributes.title,
      item.attributes.description,
      'w4lg2u0p1h', // TODO: can't find in api call response
    ));
  }
  catch (error) {
    // TODO
  }
};

export const apiGetAllTopicsSaga = function* (action: t.GetAllAction): Generator<*, *, *> {
  try {
    const response = yield call(Api.fetch);

    // eslint-disable-next-line flowtype/no-weak-types
    const data = response.body.data.map((item: Object): Topic => {
      return {
        id: item.id,
        userId: '1', // TODO: can't find in API call response
        title: item.attributes.title,
        description: item.attributes.description,
        rootContentItemId: 'w4lg2u0p1h', // TODO: can't find in api call response
      };
    });

    yield put(setItemsInState(data));
  }
  catch (error) {
    // TODO
  }
};
