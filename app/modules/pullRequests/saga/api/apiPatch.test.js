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
  let dummyStateEvent: string;
  let dummyFeedback: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyStateEvent = 'dummyStateEvent';
    dummyFeedback = 'dummyFeedback';
    dummyToken = 'dummyToken';
  });

  it(`sends a PATCH request for the passed props to the pullRequests endpoint`, (): void => {
    const dummyAction = actions.apiPatch(dummyId, dummyStateEvent, dummyFeedback);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    return expectSaga(sagas.apiPatch, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', apiToken: dummyToken }],
        [call(api.pullRequests.patch, dummyId, dummyStateEvent, dummyFeedback, dummyToken), dummyApiResponse],
      ])
      .call(api.pullRequests.patch, dummyId, dummyStateEvent, dummyFeedback, dummyToken)
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.apiPatch(dummyId, dummyStateEvent, dummyFeedback);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatch, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [call(api.pullRequests.patch, dummyId, dummyStateEvent, dummyFeedback, dummyToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
