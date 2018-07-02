// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import { put, select } from 'redux-saga/effects';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../../actionTypes';
import { move } from '../../actions';
import { subableContentItemTypes, contextTypes } from '../../model';
import type { SubableContentItem } from '../../model';
import selectors from '../../selectors';
import find from '../../lib/find';

const indentSaga = function* (action: t.IndentAction): Generator<*, *, *> {
  const { id } = action.payload;

  const contentItemToIndent = yield select(selectors.getById, { id });
  if (contentItemToIndent == null) throw new ObjectNotFoundError('contentItems:contentItem', id);

  const contentItemsById = yield select(selectors.getAllById);
  const previousSiblingItem = find.previousSiblingItem(contentItemToIndent, contentItemsById);

  if (
    previousSiblingItem != null &&
    _.includes(subableContentItemTypes, previousSiblingItem.type)
  ) {
    const subItemsCount = ((previousSiblingItem: any): SubableContentItem).subItemIds.length;
    yield put(move(
      contentItemToIndent.id,
      {
        contextType: contextTypes.SUPER,
        contextItemId: previousSiblingItem.id,
        indexInSiblingItems: subItemsCount,
      },
    ));
  }
};

export default indentSaga;
