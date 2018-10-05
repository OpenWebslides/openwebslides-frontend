// @flow

/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
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

const indent = function* (action: a.IndentAction): Saga<void> {
  const { id } = action.payload;
  const contentItemsById = yield select(selectors.getAllById);

  const contentItemToIndent = yield select(selectors.getById, { id });
  if (contentItemToIndent == null) throw new ObjectNotFoundError('contentItems:contentItem', id);
  const previousSiblingItem = lib.find.previousSiblingItem(contentItemToIndent, contentItemsById);

  // If the contentItem to indent has a previous sibling which is subable,
  // move the contentItem to the end of that sibling's list of subItems.
  if (
    previousSiblingItem != null
    && _.includes(m.subableContentItemTypes, previousSiblingItem.type)
  ) {
    const subItemsCount = ((previousSiblingItem: any): m.SubableContentItem).subItemIds.length;
    yield call(putAndReturn, actions.move(
      contentItemToIndent.id,
      {
        contextType: m.contextTypes.SUPER,
        contextItemId: previousSiblingItem.id,
        indexInSiblingItems: subItemsCount,
      },
    ));
  }
  // Else, the contentItem cannot be indented; do nothing.
};

export default indent;
