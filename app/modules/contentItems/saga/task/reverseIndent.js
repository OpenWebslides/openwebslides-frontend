// @flow

import { type Saga } from 'redux-saga';
import { call, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

const { putAndReturn } = asyncRequests.lib;

const reverseIndent = function* (action: a.ReverseIndentAction): Saga<void> {
  const { id } = action.payload;
  const contentItemsById = yield select(selectors.getAllById);

  const contentItemToReverseIndent = yield select(selectors.getById, { id });
  if (contentItemToReverseIndent == null) throw new ObjectNotFoundError('contentItems:contentItem', id);
  const parentOrSuperItem = lib.find.parentOrSuperItem(
    contentItemToReverseIndent,
    contentItemsById,
  );
  const parentOrSuperContext = (parentOrSuperItem != null)
    ? lib.find.extendedVerticalContext(parentOrSuperItem, contentItemsById)
    : null;

  // Move the contentItem to right below its parent- or superItem, if it has one.
  if (
    parentOrSuperItem != null // Note: necessary to stop flow from complaining
    && parentOrSuperContext != null
    && (
      // Make it impossible to move a non-heading to directly below a heading,
      // since that would not make sense from a semantic point of view.
      contentItemToReverseIndent.type === m.contentItemTypes.HEADING
      || parentOrSuperItem.type !== m.contentItemTypes.HEADING
    )
  ) {
    yield call(putAndReturn, actions.move(
      contentItemToReverseIndent.id,
      {
        contextType: parentOrSuperContext.contextType,
        contextItemId: parentOrSuperContext.contextItemId,
        indexInSiblingItems: parentOrSuperContext.indexInSiblingItems + 1,
      },
    ));
  }
  // Else, the contentItem cannot be reverse indented; do nothing.
};

export default reverseIndent;
