// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`create`, (): void => {

  let dummyTitle: string;
  let dummyDescription: string;
  let dummyUserId: string;

  beforeEach((): void => {
    dummyTitle = 'dummyTitle';
    dummyDescription = 'Lorem ipsum dolor sit amet.';
    dummyUserId = 'dummyUserId';
  });

  it(`puts a topics apiPost action`, (): void => {
    const dummyAction = actions.create(dummyTitle, dummyDescription, dummyUserId);

    return expectSaga(sagas.create, dummyAction)
      .put(actions.apiPost(dummyTitle, dummyDescription, dummyUserId))
      .run();
  });

});
