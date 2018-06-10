// @flow

import _ from 'lodash';
import { put, select } from 'redux-saga/effects';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import { removeFromState } from '../../actions';
import {
  contentItemTypes,
  subableContentItemTypes,
  contextTypes,
} from '../../model';
import type {
  VerticalContext,
} from '../../model';
import { getById, getParentOrSuperById } from '../../selectors';

const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  const { id } = action.payload;
  const contentItemToRemove = yield select(getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);
  let context: ?VerticalContext = null;

  // #TODO use find function instead
  // Determine the context of the contentItemToRemove
  if (contentItemToRemove.type !== contentItemTypes.ROOT) {
    const parentOrSuperItem = yield select(getParentOrSuperById, { id });
    if (parentOrSuperItem == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);

    // If the contextItem is a superItem
    if (_.includes(subableContentItemTypes, parentOrSuperItem.type)
      // Separate test in case the contextItem is both subable and a container
      && _.includes(parentOrSuperItem.subItemIds, contentItemToRemove.id)
    ) {
      context = {
        contextType: contextTypes.SUPER,
        contextItemId: parentOrSuperItem.id,
      };
    }
    // If the contextItem is a containerItem
    else {
      context = {
        contextType: contextTypes.PARENT,
        contextItemId: parentOrSuperItem.id,
      };
    }
  }

  // Remove the contentItem and move the cursor to the previous contentItem #TODO
  yield put(removeFromState(id, context));
};

export default removeSaga;
