// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiPatch`, (): void => {

  let dummyId: string;
  let dummyRead: boolean;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyRead = true;
    dummyToken = 'foobarToken';
  });

  it(`sends a PATCH request for the passed id with true as parameter to the alerts endpoint`, (): void => {
    const dummyAction = actions.apiPatch(dummyId, dummyRead);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiPatch, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.alerts.patch, dummyId, dummyRead, dummyToken), dummyApiResponse],
      ])
      .call(api.alerts.patch, dummyId, dummyRead, dummyToken)
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.apiPatch(dummyId, dummyRead);
    const dummyApiResponse = { status: 204 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatch, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.alerts.patch, dummyId, dummyRead, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
