// @flow

/* eslint-disable flowtype/no-weak-types */

import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { CorruptedInternalStateError, ObjectNotFoundError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

const { putAndReturn } = asyncRequests.lib;

const removeHeading = function* (headingToRemove: m.HeadingContentItem): Saga<void> {
  const contentItemsById = yield select(selectors.getAllById);
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

const remove = function* (action: a.RemoveAction): Saga<void> {
  const { id } = action.payload;
  const contentItemToRemove = yield select(selectors.getById, { id });
  if (contentItemToRemove == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // If the contentItem is a HEADING, take care of its subItems first.
  if (contentItemToRemove.type === m.contentItemTypes.HEADING) {
    yield call(removeHeading, contentItemToRemove);
  }

  // Then, remove the contentItem.
  yield put(actions.removeFromState(id));
};

export default remove;
