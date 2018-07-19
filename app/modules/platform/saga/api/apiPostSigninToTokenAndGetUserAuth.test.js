// @flow

import _ from 'lodash';
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import { type Identifier } from 'types/model';
import api from 'api';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import users from 'modules/users';

import actions from '../../actions';
import * as t from '../../actionTypes';

import { sagas } from '..';

describe(`apiPostSigninToTokenAndGetUserAuth`, (): void => {

  let dummyId: Identifier;
  let dummyFirstName: string;
  let dummyLastName: string;
  let dummyEmail: string;
  let dummyPassword: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyFirstName = 'Test';
    dummyLastName = 'Tester';
    dummyEmail = 'test@test.be';
    dummyPassword = 'MahPasswordY0';
    dummyToken = 'foobarToken';
  });

  it(`posts the passed email and password to the token API endpoint, processes the response and puts both the userAuth object and the current user object in the state`, (): void => {
    const dummyAction = actions.apiPostSigninToTokenAndGetUserAuth(dummyEmail, dummyPassword);
    const dummyApiResponse = {
      body: {
        data: {
          id: dummyId,
          attributes: {
            firstName: dummyFirstName,
            lastName: dummyLastName,
          },
        },
      },
      status: 201,
      token: dummyToken,
    };

    return expectSaga(sagas.apiPostSigninToTokenAndGetUserAuth, dummyAction)
      .provide([
        [call(api.token.postSignin, dummyEmail, dummyPassword), dummyApiResponse],
      ])
      .put(actions.setUserAuthInState({
        userId: dummyId,
        apiToken: dummyToken,
      }))
      .put(users.actions.setItemInState({
        id: dummyId,
        firstName: dummyFirstName,
        lastName: dummyLastName,
        email: dummyEmail,
      }))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to SUCCESS, when the saga completes without errors`, (): void => {
    const dummyAction = actions.apiPostSigninToTokenAndGetUserAuth(dummyEmail, dummyPassword);
    const dummyApiResponse = {
      body: {
        data: {
          id: dummyId,
          attributes: {
            firstName: dummyFirstName,
            lastName: dummyLastName,
          },
        },
      },
      status: 201,
      token: dummyToken,
    };

    return expectSaga(sagas.apiPostSigninToTokenAndGetUserAuth, dummyAction)
      .provide([
        [call(api.token.postSignin, dummyEmail, dummyPassword), dummyApiResponse],
      ])
      .put(apiRequestsStatus.actions.setPending(t.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH))
      .put(apiRequestsStatus.actions.setSuccess(t.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH))
      .run();
  });

  it(`sets its request status to PENDING and then sets its request status to FAILURE, when the api call fails`, (): void => {
    const dummyAction = actions.apiPostSigninToTokenAndGetUserAuth(dummyEmail, dummyPassword);
    const dummyError = new Error('Boo!');

    return expectSaga(sagas.apiPostSigninToTokenAndGetUserAuth, dummyAction)
      .provide({
        call(effect: any, next: any): any {
          if (effect.fn === api.token.postSignin) throw dummyError;
          else return next();
        },
      })
      .put(apiRequestsStatus.actions.setPending(t.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH))
      .put(apiRequestsStatus.actions.setFailure(t.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH, dummyError))
      .run();
  });

  it(`sets its request status to FAILURE and passes on the correct error, when the api response does not contain a token`, async (): Promise<*> => {
    const dummyAction = actions.apiPostSigninToTokenAndGetUserAuth(dummyEmail, dummyPassword);
    const dummyApiResponse = {
      body: {
        data: {
          id: dummyId,
          attributes: {
            firstName: dummyFirstName,
            lastName: dummyLastName,
          },
        },
      },
      status: 201,
    };

    const result = await expectSaga(sagas.apiPostSigninToTokenAndGetUserAuth, dummyAction)
      .provide([
        [call(api.token.postSignin, dummyEmail, dummyPassword), dummyApiResponse],
      ])
      .put.actionType(apiRequestsStatus.actions.setFailure(t.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH, new Error()).type)
      .run();

    expect(_.last(result.allEffects).PUT.action.payload.error).toBeInstanceOf(Error);
  });

});
