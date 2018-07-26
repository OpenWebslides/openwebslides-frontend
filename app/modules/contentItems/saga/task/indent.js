// @flow

/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import { type Saga } from 'redux-saga';
import { put, select } from 'redux-saga/effects';

import { ObjectNotFoundError } from 'errors';

import actions from '../../actions';
import * as a from '../../actionTypes';
import * as m from '../../model';
import selectors from '../../selectors';
import find from '../../lib/find';

const indentSaga = function* (action: a.IndentAction): Saga<void> {
  const { id } = action.payload;

  const contentItemToIndent = yield select(selectors.getById, { id });
  if (contentItemToIndent == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  const contentItemsById = yield select(selectors.getAllById);
  const previousSiblingItem = find.previousSiblingItem(contentItemToIndent, contentItemsById);

  if (
    previousSiblingItem != null
    && _.includes(m.subableContentItemTypes, previousSiblingItem.type)
  ) {
    const subItemsCount = ((previousSiblingItem: any): m.SubableContentItem).subItemIds.length;
    yield put(actions.move(
      contentItemToIndent.id,
      {
        contextType: m.contextTypes.SUPER,
        contextItemId: previousSiblingItem.id,
        indexInSiblingItems: subItemsCount,
      },
    ));
  }
};

export default indentSaga;
