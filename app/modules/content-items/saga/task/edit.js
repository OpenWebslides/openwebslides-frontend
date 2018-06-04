// @flow

import _ from 'lodash';
import { put, select } from 'redux-saga/effects';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import { editPropsForTypeInState } from '../../actions';
import { getById } from '../../selectors';
import {
  plainTextContentItemTypes,
} from '../../model';

const editSaga = function* (action: t.EditAction): Generator<*, *, *> {
  const { id, propsForType } = action.payload;
  const newPropsForType = { ...propsForType };

  const contentItemToEdit = yield select(getById, { id });
  if (contentItemToEdit == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  if (_.includes(plainTextContentItemTypes, contentItemToEdit.type)) {
    if (propsForType.text != null
      && propsForType.text === ''
      && contentItemToEdit.isEditing === false
    ) {
      newPropsForType.text = `*\\[Empty contentItems should be automatically deleted; delete functionality to be implemented later.\\]*`;
    }
  }
  else {
    throw new NotYetImplementedError(`ContentItemType not yet supported`);
  }

  yield put(editPropsForTypeInState(contentItemToEdit, newPropsForType));
};

export default editSaga;
