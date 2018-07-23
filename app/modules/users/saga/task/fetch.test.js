// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`fetch`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`puts an apiGet action`, (): void => {
    const dummyAction = actions.fetch(dummyId);

    return expectSaga(sagas.fetch, dummyAction)
      .put(actions.apiGet(dummyId))
      .run();
  });

});
