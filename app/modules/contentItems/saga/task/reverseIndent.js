// @flow

import { put, select } from 'redux-saga/effects';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import actions from '../../actions';
import * as model from '../../model';
import selectors from '../../selectors';
import find from '../../lib/find';

const { contentItemTypes } = model;

const reverseIndentSaga = function* (action: t.ReverseIndentAction): Generator<*, *, *> {
  const { id } = action.payload;

  const contentItemToReverseIndent = yield select(selectors.getById, { id });
  if (contentItemToReverseIndent == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  const contentItemsById = yield select(selectors.getAllById);
  const parentOrSuperItem = find.parentOrSuperItem(contentItemToReverseIndent, contentItemsById);

  if (parentOrSuperItem != null) {
    const parentOrSuperContext = find.extendedVerticalContext(parentOrSuperItem, contentItemsById);

    if (parentOrSuperContext != null) {
      if (
        contentItemToReverseIndent.type === contentItemTypes.HEADING
        || parentOrSuperItem.type !== contentItemTypes.HEADING
      ) {
        yield put(actions.move(
          contentItemToReverseIndent.id,
          {
            contextType: parentOrSuperContext.contextType,
            contextItemId: parentOrSuperContext.contextItemId,
            indexInSiblingItems: parentOrSuperContext.indexInSiblingItems + 1,
          },
        ));
      }
    }
  }
};

export default reverseIndentSaga;
