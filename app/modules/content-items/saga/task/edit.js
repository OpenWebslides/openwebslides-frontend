// @flow

import _ from 'lodash';
import { put } from 'redux-saga/effects';

import * as t from '../../actionTypes';
import { editInState } from '../../actions';
import {
  plainTextContentItemTypes,
} from '../../model';

const editSaga = function* (action: t.EditAction): Generator<*, *, *> {
  const { id, type, props } = action.payload;
  const newProps = { ...props };

  if (_.includes(plainTextContentItemTypes, type)) {
    if (props.text != null && props.text === '') {
      newProps.text = `*\\[Empty contentItems should be automatically deleted; delete functionality to be implemented later.\\]*`;
    }
  }

  yield put(editInState(id, type, newProps));
};

export default editSaga;
