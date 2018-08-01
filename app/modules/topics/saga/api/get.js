// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import api from 'api';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';

export const apiGetSaga = function* (action: a.GetAction): Saga<void> {
  try {
    const response = yield call(api.topics.get, action.payload.id);

    const item = response.body.data;
    const topic: m.Topic = {
      id: item.id,
      title: item.attributes.title,
      description: item.attributes.description,
      rootContentItemId: 'w4lg2u0p1h', // TODO: can't find in api call response
    };

    yield put(actions.setMultipleInState([topic]));
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
    const data = response.body.data.map((item: Object): m.Topic => {
      return {
        id: item.id,
        title: item.attributes.title,
        description: item.attributes.description,
        rootContentItemId: 'w4lg2u0p1h', // TODO: can't find in api call response
      };
    });

    yield put(actions.setMultipleInState(data));
  }
  catch (error) {
    // TODO: fix saga error handling
    throw error;
  }
};
