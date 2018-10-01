// @flow

import { type Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';

import actions from '../../actions';
import * as a from '../../actionTypes';
import lib from '../../lib';
import * as m from '../../model';

const generateRoot = function* (action: a.GenerateRootAction): Saga<{ rootContentItemId: string }> {
  // Generate ROOT id and add a new ROOT item with this id to the state.
  const rootContentItemId = lib.generateId();
  yield put(actions.addToState(
    rootContentItemId,
    m.contentItemTypes.ROOT,
    null,
    {},
  ));

  // Generate HEADING id and add a new HEADING to the previously added ROOT.
  // Note that for now, this is necessary for the topic to be editable in the editor.
  // #TODO include contentItem ADD button in the editor, then remove this?
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

  // Return the ROOT id so the caller can access the newly created contentItems.
  return { rootContentItemId };
};

export default generateRoot;
