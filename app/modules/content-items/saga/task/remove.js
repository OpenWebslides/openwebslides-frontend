// @flow

import _ from 'lodash';
import { put, select } from 'redux-saga/effects';
import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import { removeFromState } from '../../actions';
import { contentItemTypes, subableContentItemTypes } from '../../model';
import { getById, getParentOrSuperById } from '../../selectors';

// eslint-disable-next-line require-yield
const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  const { id } = action.payload;
  const contentItemToRemove = yield select(getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);
  let context: ?t.ActionPayloadReducerContext = null;

  if (contentItemToRemove.type !== contentItemTypes.ROOT) {
    const parentOrSuperItem = yield select(getParentOrSuperById, { id });
    if (parentOrSuperItem == null) throw new CorruptedInternalStateError(`This shouldn't happen.`);

    // If the contextItem is a superItem
    if (_.includes(subableContentItemTypes, parentOrSuperItem.type)
      // Separate test in case the contextItem is both subable and a container
      && _.includes(parentOrSuperItem.subItemIds, contentItemToRemove.id)
    ) {
      context = {
        contextType: t.actionPayloadReducerContextTypes.SUPER,
        contextItemId: parentOrSuperItem.id,
      };
    }
    // If the contextItem is a containerItem
    else {
      context = {
        contextType: t.actionPayloadReducerContextTypes.PARENT,
        contextItemId: parentOrSuperItem.id,
      };
    }
  }

  yield put(removeFromState(id, context));
};

export default removeSaga;
