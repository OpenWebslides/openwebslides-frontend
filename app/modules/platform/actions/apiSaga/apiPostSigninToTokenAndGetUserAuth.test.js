// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`apiPostSigninToTokenAndGetUserAuth`, (): void => {

  it(`returns a platform API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const dummyPassword = 'MahPasswordY0';
    const expectedAction: a.ApiPostSigninToTokenAndGetUserAuthAction = {
      type: a.API_POST_SIGNIN_TO_TOKEN_AND_GET_USER_AUTH,
      payload: {
        email: dummyEmail,
        password: dummyPassword,
      },
    };
    const actualAction = actions.apiPostSigninToTokenAndGetUserAuth(dummyEmail, dummyPassword);
    expect(actualAction).toEqual(expectedAction);
  });

});
