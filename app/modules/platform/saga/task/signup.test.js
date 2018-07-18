// @flow

import { expectSaga } from 'redux-saga-test-plan';

import users from 'modules/users';

import actions from '../../actions';

import { sagas } from '..';

describe(`signup`, (): void => {

  let dummyEmail: string;
  let dummyFirstName: string;
  let dummyLastName: string;
  let dummyPassword: string;
  let dummyTosAccepted: boolean;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyFirstName = 'Test';
    dummyLastName = 'Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;
  });

  it(`puts an users.apiPostUser action`, (): void => {
    const dummyAction = actions.signup(dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted);

    return expectSaga(sagas.signup, dummyAction)
      .put(users.actions.apiPostUser(dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted))
      .run();
  });

});
