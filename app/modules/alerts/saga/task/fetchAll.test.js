// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { UnsupportedOperationError } from 'errors';
import asyncRequests from 'modules/asyncRequests';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`fetchAll`, (): void => {

  let dummyUserId: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
  });

  it(`selects the current user's id from the state and puts a feedItems apiGetAll action`, (): void => {
    const dummyAction = actions.fetchAll();

    return expectSaga(sagas.fetchAll, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: dummyUserId }],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_GET_ALL_BY_USER_ID) ? null : next();
        })],
      ])
      .call(asyncRequests.lib.putAndReturn, actions.apiGetAllByUserId(dummyUserId))
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no user currently signed in`, async (): Promise<mixed> => {
    const dummyAction = actions.fetchAll();

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.fetchAll, dummyAction)
        .provide([
          [select(platform.selectors.getUserAuth), null],
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.API_GET_ALL_BY_USER_ID) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
