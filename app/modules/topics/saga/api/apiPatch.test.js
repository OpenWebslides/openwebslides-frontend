// @flow

import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';

import api from 'api';
import { UnexpectedHttpResponseError, UnsupportedOperationError } from 'errors';
import platform from 'modules/platform';

import actions from '../../actions';
import * as m from '../../model';

import { sagas } from '..';

describe(`apiPatch`, (): void => {

  let dummyId: string;
  let dummyAccessToken: string;
  let dummyTitle: string;
  let dummyDescription: string;
  let dummyAccess: m.AccessType;

  beforeEach((): void => {
    dummyId = 'dummyReturnedId';
    dummyAccessToken = 'dummyAccessToken';
    dummyTitle = 'The Title';
    dummyDescription = 'The description.';
    dummyAccess = m.accessTypes.PUBLIC;
  });

  it(`dispatches a PATCH action to the topics endpoint, and returns the resulting topic ID for title and description`, (): void => {
    const dummyAction = actions.apiPatch(dummyId, dummyTitle, dummyDescription, undefined);
    const dummyApiResponse = {
      status: 204,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    return expectSaga(sagas.apiPatch, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', accessToken: dummyAccessToken }],
        [call(api.topics.patch, dummyId, dummyTitle, dummyDescription, undefined, dummyAccessToken), dummyApiResponse],
      ])
      .call(api.topics.patch, dummyId, dummyTitle, dummyDescription, undefined, dummyAccessToken)
      .returns({ id: dummyId })
      .run();
  });

  it(`dispatches a PATCH action to the topics endpoint, and returns the resulting topic ID for access`, (): void => {
    const dummyAction = actions.apiPatch(dummyId, undefined, undefined, dummyAccess);
    const dummyApiResponse = {
      status: 204,
      body: {
        data: {
          id: dummyId,
        },
      },
    };

    return expectSaga(sagas.apiPatch, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', accessToken: dummyAccessToken }],
        [call(api.topics.patch, dummyId, undefined, undefined, 'public', dummyAccessToken), dummyApiResponse],
      ])
      .call(api.topics.patch, dummyId, undefined, undefined, 'public', dummyAccessToken)
      .returns({ id: dummyId })
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no currently signed in user`, async (): Promise<void> => {
    const dummyAction = actions.apiPatch(dummyId, dummyTitle, dummyDescription, dummyAccess);
    const dummyApiResponse = {
      status: 204,
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
          [call(api.topics.patch, dummyId, dummyTitle, dummyDescription, 'public', dummyAccessToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

  it(`throws an UnexpectedHttpResponseError, when the request response doesn't contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiPatch(dummyId, dummyTitle, dummyDescription, dummyAccess);
    const dummyApiResponse = { status: 200 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPatch, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), { userId: 'dummyUserId', accessToken: dummyAccessToken }],
          [call(api.topics.patch, dummyId, dummyTitle, dummyDescription, 'public', dummyAccessToken), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
