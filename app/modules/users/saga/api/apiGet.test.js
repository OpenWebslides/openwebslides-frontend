// @flow

import _ from 'lodash';
import { call, select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnsupportedOperationError } from 'errors';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

import actions from '../../actions';
import * as a from '../../actionTypes';

import { sagas } from '..';

describe(`apiGet`, (): void => {

  let dummyId: string;
  let dummyEmail: string;
  let dummyName: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyUserId';
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyToken = 'foobarToken';
  });

  it(`sends a GET request for the passed id to the uses API endpoint, processes the response and sets the user in the state`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            id: dummyId,
            email: dummyEmail,
            name: dummyName,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.users.get, dummyId, dummyToken), dummyApiResponse],
      ])
      .call(api.users.get, dummyId, dummyToken)
      .put(actions.setMultipleInState([{ id: dummyId, email: dummyEmail, name: dummyName }]))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            id: dummyId,
            email: dummyEmail,
            name: dummyName,
          },
        },
      },
    };

    return expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), { userId: 'dummyId', apiToken: dummyToken }],
        [call(api.users.get, dummyId, dummyToken), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put(apiRequestsStatus.actions.setSuccess(a.API_GET))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiGet, dummyAction)
      .provide({
        select({ selector }: any, next: any): any {
          if (selector === platform.selectors.getUserAuth) return { userId: 'dummyId', apiToken: dummyToken };
          else return next();
        },
        call({ fn }: any, next: any): any {
          if (fn === api.users.get) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put(apiRequestsStatus.actions.setFailure(a.API_GET, dummyError))
      .run();
  });

  it(`sets its request status to FAILURE, when there is no currently signed in user`, async (): Promise<*> => {
    const dummyAction = actions.apiGet(dummyId);
    const dummyApiResponse = {
      status: 200,
      body: {
        data: {
          attributes: {
            id: dummyId,
            email: dummyEmail,
            name: dummyName,
          },
        },
      },
    };

    const result = await expectSaga(sagas.apiGet, dummyAction)
      .provide([
        [select(platform.selectors.getUserAuth), null],
        [call(api.users.get, dummyId, dummyToken), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(a.API_GET))
      .put.actionType(apiRequestsStatus.actions.setFailure(a.API_GET, new Error()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(UnsupportedOperationError);
  });

});
