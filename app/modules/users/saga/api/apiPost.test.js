// @flow

import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import api from 'api';
import { UnexpectedHttpResponseError } from 'errors';

import actions from '../../actions';
import * as m from '../../model';

import { sagas } from '..';

describe(`apiPost`, (): void => {

  let dummyId: string;
  let dummyEmail: string;
  let dummyName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;
  let dummyAge: number;
  let dummyGender: m.GenderType;
  let dummyRole: m.RoleType;
  let dummyCountry: m.CountryType;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;
    dummyAge = 18;
    dummyGender = m.genderTypes.MALE;
    dummyRole = m.roleTypes.LEARNER;
    dummyCountry = m.countryTypes.BELGIUM;
  });

  it(`sends a POST request with the passed props to the uses API endpoint, and returns the resulting user ID`, (): void => {
    const dummyAction = actions.apiPost(dummyEmail, dummyName, dummyPassword, dummyTosAccepted, dummyAge, dummyGender, dummyRole, dummyCountry);
    const dummyApiResponse = { status: 204, body: { data: { id: dummyId } } };

    return expectSaga(sagas.apiPost, dummyAction)
      .provide([
        [call(api.users.post, dummyEmail, dummyName, dummyPassword, dummyTosAccepted, dummyAge, dummyGender, dummyRole, dummyCountry), dummyApiResponse],
      ])
      .call(api.users.post, dummyEmail, dummyName, dummyPassword, dummyTosAccepted, dummyAge, dummyGender, dummyRole, dummyCountry)
      .returns({ id: dummyId })
      .run();
  });

  it(`throws an UnexpectedHttpResponseError, when the request response doesn't contain a body`, async (): Promise<void> => {
    const dummyAction = actions.apiPost(dummyEmail, dummyName, dummyPassword, dummyTosAccepted, dummyAge, dummyGender, dummyRole, dummyCountry);
    const dummyApiResponse = { status: 204 };

    // Suppress console.error from redux-saga $FlowFixMe
    console.error = jest.fn();
    await expect(
      expectSaga(sagas.apiPost, dummyAction)
        .provide([
          [call(api.users.post, dummyEmail, dummyName, dummyPassword, dummyTosAccepted, dummyAge, dummyGender, dummyRole, dummyCountry), dummyApiResponse],
        ])
        .run(),
    ).rejects.toBeInstanceOf(UnexpectedHttpResponseError);
  });

});
