// @flow

import _ from 'lodash';
import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';
import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

const { putAndReturn } = asyncRequests.lib;

const toggleEditing = function* (action: a.ToggleEditingAction): Saga<void> {
  const { id, isEditing } = action.payload;
  const contentItemToToggle = yield select(selectors.getById, { id });
  if (contentItemToToggle == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // If the new isEditing value is not explicitly passed, flip the previous value.
  const newIsEditing = (isEditing != null) ? isEditing : !contentItemToToggle.isEditing;

  // If the new isEditing value is the same as the previous one
  if (newIsEditing === contentItemToToggle.isEditing) {
    // Do nothing.
  }
  // If the contentItem's isEditing value is flipped from FALSE to TRUE
  else if (newIsEditing) {
    // Find the previous contentItem with isEditing === TRUE (if there is one)
    const currentlyEditingItem = yield select(selectors.getCurrentlyEditing);
    const previousEditingItemId = (currentlyEditingItem != null) ? currentlyEditingItem.id : null;
    // and move the isEditing status from that contentItem to the new one
    yield put(actions.switchEditingInState(previousEditingItemId, id));
  }
  // If the contentItem's isEditing value is flipped from TRUE to FALSE
  else {
    // Remove the contentItem's isEditing status without moving it to a new contentItem.
    yield put(actions.switchEditingInState(id, null));
    // Perform an edit action in order to validate all editable props with isEditing === FALSE.
    yield call(putAndReturn, actions.edit(id, _.pick(
      contentItemToToggle,
      m.editablePropsForType[contentItemToToggle.type],
    )));
  }
};

export default toggleEditing;
