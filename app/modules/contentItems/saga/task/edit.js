// @flow

import _ from 'lodash';
import { put, select } from 'redux-saga/effects';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

const editSaga = function* (action: t.EditAction): Generator<*, *, *> {
  const { id, propsForType } = action.payload;
  const newPropsForType = { ...propsForType };

  const contentItemToEdit = yield select(selectors.getById, { id });
  if (contentItemToEdit == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  if (_.includes(m.plainTextContentItemTypes, contentItemToEdit.type)) {
    if (propsForType.text != null
      && propsForType.text === ''
      && contentItemToEdit.isEditing === false
    ) {
      yield put(actions.remove(contentItemToEdit.id));
    }
    else {
      yield put(actions.editPropsForTypeInState(contentItemToEdit, newPropsForType));
    }
  }
  else {
    throw new NotYetImplementedError(`ContentItemType not yet supported`);
  }
};

export default editSaga;
