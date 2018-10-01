// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';

import { sagas } from '..';

describe(`apiDelete`, (): void => {

  let dummyId: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyToken = 'foobarToken';
  });

  it(`sends a DELETE request for the passed id to the topics endpoint`, (): void => {
    const dummyAction = actions.apiDelete(dummyId);
    const dummyApiResponse = { status: 204 };

    return expectSaga(sagas.apiDelete, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.topics.delete, dummyId, dummyToken), dummyApiResponse],
      ])
      .call(api.topics.delete, dummyId, dummyToken)
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<mixed> => {
    const dummyAction = actions.apiDelete(dummyId);
    const dummyApiResponse = { status: 204 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiDelete, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.topics.delete, dummyId, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
