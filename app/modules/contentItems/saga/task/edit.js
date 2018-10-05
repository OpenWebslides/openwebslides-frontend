// @flow

import _ from 'lodash';
import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { NotYetImplementedError, ObjectNotFoundError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';
import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

const { putAndReturn } = asyncRequests.lib;

const edit = function* (action: a.EditAction): Saga<void> {
  const { id, propsForType } = action.payload;
  const contentItemToEdit = yield select(selectors.getById, { id });
  if (contentItemToEdit == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // Note: only plaintext contentItems are supported a.t.m.
  if (_.includes(m.plainTextContentItemTypes, contentItemToEdit.type)) {
    // If the user attempts to save and move the cursor away from an empty contentItem,
    // remove it instead.
    // #TODO move this logic to toggleEditing?
    if (
      propsForType.text != null
      && propsForType.text === ''
      && contentItemToEdit.isEditing === false
    ) {
      yield call(putAndReturn, actions.remove(contentItemToEdit.id));
    }
    // If the contentItem isn't empty or is still in the process of being edited, process the edits.
    else {
      yield put(actions.editPropsForTypeInState(contentItemToEdit, propsForType));
    }
  }
  // Temporarily throw an error when trying to edit a non-plaintext contentItem.
  else {
    throw new NotYetImplementedError(`ContentItemType not yet supported`);
  }
};

export default edit;
