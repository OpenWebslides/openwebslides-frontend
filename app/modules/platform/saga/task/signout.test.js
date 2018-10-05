// @flow

import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { dynamic } from 'redux-saga-test-plan/providers';

import { UnsupportedOperationError } from 'errors';
import asyncRequests from 'modules/asyncRequests';

import actions from '../../actions';
import * as a from '../../actionTypes';
import selectors from '../../selectors';

import { sagas } from '..';

describe(`signout`, (): void => {

  let dummyToken: string;

  beforeEach((): void => {
    dummyToken = 'foobarToken';
  });

  it(`selects the current user's token from the state and puts an apiDeleteToken action, then puts an setUserAuthInState(null) action`, (): void => {
    const dummyAction = actions.signout();

    return expectSaga(sagas.signout, dummyAction)
      .provide([
        [select(selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
          return (action.type === a.API_DELETE_TOKEN) ? null : next();
        })],
      ])
      .put(actions.setUserAuthInState(null))
      .call(asyncRequests.lib.putAndReturn, actions.apiDeleteToken(dummyToken))
      .run();
  });

  it(`throws an UnsupportedOperationError, when there is no user currently signed in`, async (): Promise<mixed> => {
    const dummyAction = actions.signout();

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.signout, dummyAction)
        .provide([
          [select(selectors.getUserAuth), null],
          [matchers.call.fn(asyncRequests.lib.putAndReturn), dynamic(({ args: [action] }: any, next: any): any => {
            return (action.type === a.API_DELETE_TOKEN) ? null : next();
          })],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnsupportedOperationError);
  });

});
