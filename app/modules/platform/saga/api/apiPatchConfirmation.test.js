// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPatchConfirmation`, (): void => {

  let dummyToken: string;

  beforeEach((): void => {
    dummyToken = 'foobarToken';
  });

  it(`executes a patch request to the confirmation API endpoint`, (): void => {
    const dummyAction = actions.apiPatchConfirmation(dummyToken);
    const dummyApiResponse = { status: 200 };

    return expectSaga(sagas.apiPatchConfirmation, dummyAction)
      .provide([
        [call(api.confirmation.patch, dummyToken), dummyApiResponse],
      ])
      .call(api.confirmation.patch, dummyToken)
      .run();
  });

});
