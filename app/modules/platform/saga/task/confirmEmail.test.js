// @flow

import { expectSaga } from 'redux-saga-test-plan';

import actions from '../../actions';

import { sagas } from '..';

describe(`confirmEmail`, (): void => {

  let dummyConfirmationToken: string;

  beforeEach((): void => {
    dummyConfirmationToken = 'foobarToken';
  });

  it(`puts an apiPatchConfirmation action`, (): void => {
    const dummyAction = actions.confirmEmail(dummyConfirmationToken);

    return expectSaga(sagas.confirmEmail, dummyAction)
      .put(actions.apiPatchConfirmation(dummyConfirmationToken))
      .run();
  });

});

