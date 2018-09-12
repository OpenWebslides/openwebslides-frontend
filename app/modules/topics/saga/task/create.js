// @flow

import { type Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import contentItems from 'modules/contentItems';
// eslint-disable-next-line import/no-internal-modules
import generateId from 'modules/contentItems/lib/generateId'; // #TODO

import actions from '../../actions';
import * as a from '../../actionTypes';

const { contentItemTypes, contextTypes } = contentItems.model;

const createInitialTopicRoot = function* (rootContentItemId: string): Saga<void> {
  yield put(contentItems.actions.addToState(
    rootContentItemId,
    contentItemTypes.ROOT,
    null,
    {},
  ));
  const headingContentItemId = generateId();
  yield put(contentItems.actions.addToState(
    headingContentItemId,
    contentItemTypes.HEADING,
    {
      contextType: contextTypes.PARENT,
      contextItemId: rootContentItemId,
    },
    {
      // #TODO prevent from being deleted
      text: 'Placeholder',
    },
  ));
  yield put(contentItems.actions.toggleEditing(headingContentItemId, true));
};

const create = function* (action: a.CreateAction): Saga<void> {
  const { title, description, userId } = action.payload;

  // Generate initial topic content
  // #TODO move this to contentItems module as soom as saga communication has been fixed
  const rootContentItemId = generateId();
  yield call(createInitialTopicRoot, rootContentItemId);

  yield put(actions.apiPost(title, description, rootContentItemId, userId));
};

export default create;
