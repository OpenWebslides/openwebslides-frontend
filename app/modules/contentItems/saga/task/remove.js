// @flow

/* eslint-disable flowtype/no-weak-types */

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { CorruptedInternalStateError, ObjectNotFoundError, UnsupportedOperationError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

const { putAndReturn } = asyncRequests.lib;

const removeHeading = function* (
  headingToRemove: m.HeadingContentItem,
  contentItemsById: m.ContentItemsById,
): Saga<void> {
  const previousSiblingItem = lib.find.previousSiblingItem(headingToRemove, contentItemsById);
  let moveContext: m.VerticalContext;

  // Note: we move the HEADING's subItems in such a way that the editor behaves in a similar way to
  // existing editors for 'flat' documents; i.e. when a heading is removed, the content that follows
  // it ends up below the previous heading.

  // Move the HEADING's subItems to the end of the previous HEADING, if there is one.
  if (previousSiblingItem != null && previousSiblingItem.type === m.contentItemTypes.HEADING) {
    const subItemsCount = ((previousSiblingItem: any): m.HeadingContentItem).subItemIds.length;

    moveContext = {
      contextType: m.contextTypes.SUPER,
      contextItemId: previousSiblingItem.id,
      indexInSiblingItems: subItemsCount,
    };
  }
  // Or, if there is no previous HEADING, to the location where the removed HEADING used to be.
  else {
    const context = lib.find.extendedVerticalContext(headingToRemove, contentItemsById);
    if (context == null) throw new CorruptedInternalStateError(`Invalid contentItemsById: could not find parentOrSuperItem for a non-ROOT contentItem.`);

    moveContext = context;
  }

  // Move the subItems; do this in reverse so we can use the same moveContext every time.
  for (let i: number = headingToRemove.subItemIds.length - 1; i >= 0; i -= 1) {
    yield call(putAndReturn, actions.move(
      headingToRemove.subItemIds[i],
      moveContext,
    ));
  }
};

const generatePlaceholderIfRootEmpty = function* (rootContentItemId: string): Saga<void> {
  // Get the updated ROOT, after the remove has been completed.
  const rootContentItem = yield select(selectors.getById, { id: rootContentItemId });

  // If the ROOT is empty, generate a placeholder item.
  if (rootContentItem.childItemIds.length === 0) {
    yield call(putAndReturn, actions.generatePlaceholder(rootContentItemId));
  }
};

const remove = function* (action: a.RemoveAction): Saga<void> {
  const { id } = action.payload;
  const contentItemToRemove = yield select(selectors.getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // Verify that the contentItemToRemove isn't the ROOT, since the ROOT should not be removable.
  if (contentItemToRemove.type === m.contentItemTypes.ROOT) throw new UnsupportedOperationError('Cannot remove a ROOT contentItem.');

  // Find the ROOT before removing the contentItem, since this won't be possible afterwards.
  const contentItemsById = yield select(selectors.getAllById);
  const rootContentItem = lib.find.closest(
    contentItemToRemove,
    contentItemsById,
    lib.find.parentOrSuperItem,
    (contentItem: m.ContentItem) => (contentItem.type === m.contentItemTypes.ROOT),
  );
  if (rootContentItem == null) throw new CorruptedInternalStateError('Invalid contentItemsById: could not find ROOT.');

  // If the contentItem is a HEADING, take care of its subItems first.
  if (contentItemToRemove.type === m.contentItemTypes.HEADING) {
    yield call(removeHeading, contentItemToRemove, contentItemsById);
  }

  // Then, remove the contentItem.
  yield put(actions.removeFromState(id));

  // If the removed contentItem was the last child of the ROOT,
  // generate a new placeholder so that the user still has a place to continue editing.
  yield call(generatePlaceholderIfRootEmpty, rootContentItem.id);
};

export { removeHeading };
export default remove;
