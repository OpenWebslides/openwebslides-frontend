// @flow

import * as t from '../../actionTypes';

import actions from '.';

describe(`apiPostSigninAndGetUserAuth`, (): void => {

  it(`returns a platform API_POST_SIGNIN_AND_GET_USER_AUTH action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const dummyPassword = 'MahPasswordY0';
    const expectedAction: t.ApiPostSigninAndGetUserAuthAction = {
      type: t.API_POST_SIGNIN_AND_GET_USER_AUTH,
      payload: {
        email: dummyEmail,
        password: dummyPassword,
      },
    };
    const actualAction = actions.apiPostSigninAndGetUserAuth(dummyEmail, dummyPassword);
    expect(actualAction).toEqual(expectedAction);
  });

});
