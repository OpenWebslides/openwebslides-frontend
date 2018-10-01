// @flow

import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

const reverseIndentSaga = function* (action: a.ReverseIndentAction): Saga<void> {
  const { id } = action.payload;

  const contentItemToReverseIndent = yield select(selectors.getById, { id });
  if (contentItemToReverseIndent == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  const contentItemsById = yield select(selectors.getAllById);
  const parentOrSuperItem = lib.find.parentOrSuperItem(
    contentItemToReverseIndent,
    contentItemsById,
  );

  if (parentOrSuperItem != null) {
    const parentOrSuperContext = lib.find.extendedVerticalContext(
      parentOrSuperItem,
      contentItemsById,
    );

    if (parentOrSuperContext != null) {
      if (
        contentItemToReverseIndent.type === m.contentItemTypes.HEADING
        || parentOrSuperItem.type !== m.contentItemTypes.HEADING
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
