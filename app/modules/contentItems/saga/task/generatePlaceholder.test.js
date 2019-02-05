// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';
import lib from '../../lib';
import * as m from '../../model';

import { sagas } from '..';

describe(`generatePlaceholder`, (): void => {

  let dummyRootContentItemId: string;
  let dummyGeneratedId: string;

  beforeEach((): void => {
    dummyRootContentItemId = 'dummyRootContentItemId';
    dummyGeneratedId = 'dummyGeneratedId';
    lib.generateId = jest.fn();
    lib.generateId.mockReturnValueOnce(dummyGeneratedId);
  });

  it(`adds a single HEADING with placeholder text to the passed ROOT, and returns the new heading's id`, (): void => {
    const dummyAction = actions.generatePlaceholder(dummyRootContentItemId);

    return expectSaga(sagas.generatePlaceholder, dummyAction)
      .put(actions.addToState(dummyGeneratedId, m.contentItemTypes.HEADING, { contextType: m.contextTypes.PARENT, contextItemId: dummyRootContentItemId }, { text: 'This is a header' }))
      .returns({ placeholderContentItemId: dummyGeneratedId })
      .run();
  });

});
