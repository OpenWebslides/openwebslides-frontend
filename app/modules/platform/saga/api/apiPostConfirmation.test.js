// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPostConfirmation`, (): void => {

  let dummyEmail: string;

  beforeEach((): void => {
    dummyEmail = 'foo@bar.com';
  });

  it(`executes a post request to the confirmation API endpoint`, (): void => {
    const dummyAction = actions.apiPostConfirmation(dummyEmail);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPostConfirmation, dummyAction)
      .provide([
        [call(api.confirmation.post, dummyEmail), dummyApiResponse],
      ])
      .call(api.confirmation.post, dummyEmail)
      .run();
  });

});
