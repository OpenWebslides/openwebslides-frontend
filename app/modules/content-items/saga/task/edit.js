// @flow

import _ from 'lodash';
import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { editInState } from '../../actions';
import {
  plainTextContentItemTypes,
} from '../../model';

const editSaga = function* (action: t.EditAction): Generator<*, *, *> {
  const { id, type, propsForType } = action.payload;
  const newPropsForType = { ...propsForType };

  if (_.includes(plainTextContentItemTypes, type)) {
    if (propsForType.text != null && propsForType.text === '') {
      newPropsForType.text = `*\\[Empty contentItems should be automatically deleted; delete functionality to be implemented later.\\]*`;
    }
  }

  yield put(editInState(id, type, newPropsForType));
};

export default editSaga;
