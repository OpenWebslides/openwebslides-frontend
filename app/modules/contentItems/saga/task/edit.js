// @flow

import _ from 'lodash';
import { type Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';

import { CorruptedInternalStateError, ObjectNotFoundError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import * as a from '../../actionTypes';
import actions from '../../actions';
import lib from '../../lib';
import * as m from '../../model';
import selectors from '../../selectors';

const { putAndReturn } = asyncRequests.lib;

const findNextParagraphs = function* (
  context: m.ExtendedVerticalContext,
): Saga<$ReadOnlyArray<m.ParagraphContentItem>> {
  const nextParagraphs = [];
  let currentSiblingItem: ?m.ContentItem;

  for (let i: number = context.indexInSiblingItems + 1; i < context.siblingItemIds.length; i += 1) {
    currentSiblingItem = yield select(selectors.getById, { id: context.siblingItemIds[i] });

    if (currentSiblingItem != null && currentSiblingItem.type === m.contentItemTypes.PARAGRAPH) {
      nextParagraphs.push(currentSiblingItem);
    }
    else {
      break;
    }
  }

  return nextParagraphs;
};

const convertParagraphIntoHeading = function* (contentItem: m.ParagraphContentItem): Saga<void> {
  // Get contentItem context data.
  const contentItemsById = yield select(selectors.getAllById);
  const context = lib.find.extendedVerticalContext(contentItem, contentItemsById);
  if (context == null) throw new CorruptedInternalStateError('Corrupted contentItemsById: could not find context for PARAGRAPH contentItem.');

  // First, make sure the conversion doesn't result in invalid state;
  // i.e. make sure that the new HEADING is not followed by sibling PARAGRAPHS.
  // Do this by moving all sibling PARAGRAPHs to the new HEADINGs subItems (similar to what would
  // happen in a more conventional editor, where if you insert a heading above existing paragraphs,
  // those paragraphs automatically 'belong' to that heading).
  const nextParagraphs = yield call(findNextParagraphs, context);
  const moveContext: m.VerticalContext = {
    contextType: m.contextTypes.SUPER,
    contextItemId: contentItem.id,
    indexInSiblingItems: contentItem.subItemIds.length,
  };
  // Note: do this in reverse so we can use the same moveContext every time.
  for (let i: number = nextParagraphs.length - 1; i >= 0; i -= 1) {
    yield call(putAndReturn, actions.move(
      nextParagraphs[i].id,
      moveContext,
    ));
  }

  // Convert the contentItem.
  yield put(actions.convertInState(contentItem.id, m.contentItemTypes.HEADING));
};

const edit = function* (action: a.EditAction): Saga<void> {
  const { id, propsForType } = action.payload;
  const newPropsForType = { ...propsForType };
  let contentItemToEdit: ?m.ContentItem = yield select(selectors.getById, { id });
  if (contentItemToEdit == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  // Enable PARAGRAPH -> HEADING conversion by typing '# ' at the start of the text field.
  if (
    contentItemToEdit.type === m.contentItemTypes.PARAGRAPH
    && propsForType.text != null && _.startsWith(propsForType.text, '# ')
  ) {
    // Convert the contentItem.
    yield call(convertParagraphIntoHeading, contentItemToEdit);
    // Get the updated contentItem from the state.
    contentItemToEdit = yield select(selectors.getById, { id });
    // Remove the '# ' prefix from the passed text prop.
    newPropsForType.text = propsForType.text.substring(2);
  }

  yield put(actions.editPropsForTypeInState(contentItemToEdit, newPropsForType));
};

export default edit;
