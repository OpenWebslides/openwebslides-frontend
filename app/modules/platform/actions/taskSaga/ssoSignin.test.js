// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`ssoSignin`, (): void => {

  it(`returns a platform SSO_SIGNIN action containing the passed props`, (): void => {
    const dummyRefreshToken = 'dummyRefreshToken';
    const dummyUserId = 'dummyUserId';
    const expectedAction: a.SSOSigninAction = {
      type: a.SSO_SIGNIN,
      payload: {
        userId: dummyUserId,
        refreshToken: dummyRefreshToken,
      },
    };
    const actualAction = actions.ssoSignin(dummyUserId, dummyRefreshToken);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
