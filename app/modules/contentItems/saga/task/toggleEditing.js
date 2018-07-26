// @flow

import _ from 'lodash';
import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';

import * as a from '../../actionTypes';
import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

const toggleEditingSaga = function* (action: a.ToggleEditingAction): Saga<void> {
  const { id, isEditing } = action.payload;
  const contentItemToToggle = yield select(selectors.getById, { id });
  if (contentItemToToggle == null) throw new ObjectNotFoundError('contentItems:contentItem', id);
  const newIsEditing = (isEditing != null) ? isEditing : !contentItemToToggle.isEditing;

  if (newIsEditing !== contentItemToToggle.isEditing) {
    if (newIsEditing) {
      const currentlyEditingItem = yield select(selectors.getCurrentlyEditing);
      const previousEditingItemId = (currentlyEditingItem != null) ? currentlyEditingItem.id : null;
      yield put(actions.switchEditingInState(previousEditingItemId, id));
    }
    else {
      yield put(actions.switchEditingInState(id, null));
      // Perform an edit action in order to validate all editable props with isEditing === FALSE.
      const propsForType = _.pick(
        contentItemToToggle,
        m.editablePropsForType[contentItemToToggle.type],
      );
      yield put(actions.edit(id, propsForType));
    }
  }
};

export default toggleEditingSaga;
