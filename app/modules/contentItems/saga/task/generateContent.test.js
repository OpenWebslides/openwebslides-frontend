// @flow

import { expectSaga } from 'redux-saga-test-plan';

import * as a from '../../actionTypes';
import actions from '../../actions';
import * as m from '../../model';

import { sagas } from '..';

describe(`generateContent`, (): void => {

  let dummyRootContentItemId: string;

  beforeEach((): void => {
    dummyRootContentItemId = 'dummyRootContentItemId';
  });

  it(`adds two headings with subparagraphs to the passed ROOT`, (): void => {
    const dummyAction = actions.generateContent(dummyRootContentItemId);

    return expectSaga(sagas.generateContent, dummyAction)
      .put.like({ action: { type: a.ADD_TO_STATE, payload: { type: m.contentItemTypes.HEADING } } })
      .put.like({ action: { type: a.ADD_TO_STATE, payload: { type: m.contentItemTypes.PARAGRAPH } } })
      .put.like({ action: { type: a.ADD_TO_STATE, payload: { type: m.contentItemTypes.HEADING } } })
      .put.like({ action: { type: a.ADD_TO_STATE, payload: { type: m.contentItemTypes.PARAGRAPH } } })
      .put.like({ action: { type: a.ADD_TO_STATE, payload: { type: m.contentItemTypes.PARAGRAPH } } })
      .run();
  });

});
