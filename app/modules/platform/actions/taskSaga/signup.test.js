// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`signup`, (): void => {

  it(`returns a platform SIGNUP action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const dummyName = 'Test Tester';
    const dummyPassword = 'MahPasswordY0';
    const dummyTosAccepted = true;
    const expectedAction: a.SignupAction = {
      type: a.SIGNUP,
      payload: {
        email: dummyEmail,
        name: dummyName,
        password: dummyPassword,
        tosAccepted: dummyTosAccepted,
      },
    };
    const actualAction = actions.signup(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
