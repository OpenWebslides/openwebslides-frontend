// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import lib from '../../lib';
import * as m from '../../model';

import { sagas } from '..';

describe(`generateRoot`, (): void => {

  let dummyGeneratedId1: string;
  let dummyGeneratedId2: string;

  beforeEach((): void => {
    dummyGeneratedId1 = 'dummyGeneratedId1';
    dummyGeneratedId2 = 'dummyGeneratedId2';
    lib.generateId = jest.fn();
    lib.generateId
      .mockReturnValueOnce(dummyGeneratedId1)
      .mockReturnValueOnce(dummyGeneratedId2);
  });

  it(`generates a new ROOT with a single HEADING as a child, adds both to the state, and returns the ROOT id`, (): void => {
    const dummyAction = actions.generateRoot();

    return expectSaga(sagas.generateRoot, dummyAction)
      .put(actions.addToState(dummyGeneratedId1, m.contentItemTypes.ROOT, null, {}))
      .put(actions.addToState(dummyGeneratedId2, m.contentItemTypes.HEADING, { contextType: m.contextTypes.PARENT, contextItemId: dummyGeneratedId1 }, { text: 'Placeholder' }))
      .returns({ rootContentItemId: dummyGeneratedId1 })
      .run();
  });

});
