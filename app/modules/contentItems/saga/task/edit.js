// @flow

import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';

import * as a from '../../actionTypes';
import actions from '../../actions';
import selectors from '../../selectors';

const edit = function* (action: a.EditAction): Saga<void> {
  const { id, propsForType } = action.payload;
  const contentItemToEdit = yield select(selectors.getById, { id });
  if (contentItemToEdit == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  yield put(actions.editPropsForTypeInState(contentItemToEdit, propsForType));
};

export default edit;
