// @flow

import _ from 'lodash';
import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
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
  else {
    let previousEditingItemId: ?string;
    let nextEditingItemId: ?string;

    // If the contentItem's isEditing value is flipped from FALSE to TRUE
    if (newIsEditing === true) {
      // Find the previous contentItem with isEditing === TRUE (if there is one)
      const currentlyEditingItem = yield select(selectors.getCurrentlyEditing);
      // and set the previous/nextEditingItemIds to move isEditing status
      // from that contentItem to this one.
      previousEditingItemId = (currentlyEditingItem != null) ? currentlyEditingItem.id : null;
      nextEditingItemId = id;
    }
    // If the contentItem's isEditing value is flipped from TRUE to FALSE
    else {
      // Set the previous/nextEditingItemIds to remove the contentItem's isEditing status
      // without moving it to a new contentItem.
      previousEditingItemId = id;
      nextEditingItemId = null;
    }

    // Switch over the isEditing status in the state.
    yield put(actions.switchEditingInState(previousEditingItemId, nextEditingItemId));

    // Perform some validation on the contentItem that previusly had isEditing status, if it exists.
    if (previousEditingItemId != null) {
      const previousEditingItem = yield select(selectors.getById, { id: previousEditingItemId });

      // If isEditing status is moved away from an empty contentItem, remove it.
      if (lib.isEmpty(previousEditingItem)) {
        yield call(putAndReturn, actions.remove(previousEditingItemId));
      }
      // Perform an 'empty' edit action to make sure all of the contentItem's editable props
      // have been validated with isEditing === FALSE.
      else {
        yield call(putAndReturn, actions.edit(previousEditingItemId, _.pick(
          previousEditingItem,
          m.editablePropsForType[previousEditingItem.type],
        )));
      }
    }
  }
};

export default toggleEditing;
