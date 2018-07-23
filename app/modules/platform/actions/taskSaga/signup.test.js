// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`signup`, (): void => {

  it(`returns a platform SIGNUP action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const dummyFirstName = 'Test';
    const dummyLastName = 'Tester';
    const dummyPassword = 'MahPasswordY0';
    const dummyTosAccepted = true;
    const expectedAction: a.SignupAction = {
      type: a.SIGNUP,
      payload: {
        email: dummyEmail,
        firstName: dummyFirstName,
        lastName: dummyLastName,
        password: dummyPassword,
        tosAccepted: dummyTosAccepted,
      },
    };
    const actualAction = actions.signup(dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted);

    expect(actualAction).toEqual(expectedAction);
  });

  it(`converts a lastName value of NULL to UNDEFINED`, (): void => {
    const dummyEmail = 'test@test.be';
    const dummyFirstName = 'Test';
    const dummyPassword = 'MahPasswordY0';
    const dummyTosAccepted = true;
    const expectedAction: a.SignupAction = {
      type: a.SIGNUP,
      payload: {
        email: dummyEmail,
        firstName: dummyFirstName,
        password: dummyPassword,
        tosAccepted: dummyTosAccepted,
      },
    };
    const actualAction = actions.signup(dummyEmail, dummyFirstName, null, dummyPassword, dummyTosAccepted);

    expect(actualAction).toEqual(expectedAction);
  });

});
