// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`fetchAll`, (): void => {

  it(`puts a feedItems apiGetAll action`, (): void => {
    const dummyAction = actions.fetchAll();

    return expectSaga(sagas.fetchAll, dummyAction)
      .put(actions.apiGetAll())
      .run();
  });

});
