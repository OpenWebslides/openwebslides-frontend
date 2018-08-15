// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`remove`, (): void => {

  let dummyId: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
  });

  it(`puts a topics apiDelete action, then puts a topics removeFromState action`, (): void => {
    const dummyAction = actions.remove(dummyId);

    return expectSaga(sagas.remove, dummyAction)
      .put(actions.apiDelete(dummyId))
      .put(actions.removeFromState(dummyId))
      .run();
  });

});
