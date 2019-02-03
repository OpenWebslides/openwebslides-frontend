// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';

const generatePlaceholder = function* (
  action: a.GeneratePlaceholderAction,
): Saga<{ placeholderContentItemId: string }> {
  const { rootContentItemId } = action.payload;

  // Generate HEADING id and add a new HEADING to the ROOT.
  const headingContentItemId = lib.generateId();
  yield put(actions.addToState(
    headingContentItemId,
    m.contentItemTypes.HEADING,
    {
      contextType: m.contextTypes.PARENT,
      contextItemId: rootContentItemId,
    },
    {
      text: 'Placeholder',
    },
  ));

  // Return the placeholder id so the caller can access the newly created contentItems.
  return { placeholderContentItemId: headingContentItemId };
};

export default generatePlaceholder;
