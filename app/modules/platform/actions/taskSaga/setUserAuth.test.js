// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`setUserAuth`, (): void => {

  it(`returns a platform setUserAuth action containing the passed props`, (): void => {
    const dummyRefreshToken = 'dummyRefreshToken';
    const dummyAccessToken = 'dummyAccessToken';
    const dummyUserId = 'dummyUserId';
    const expectedAction: a.SetUserAuthAction = {
      type: a.SET_USER_AUTH,
      payload: {
        refreshToken: dummyRefreshToken,
        accessToken: dummyAccessToken,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.setUserAuth(dummyUserId, dummyRefreshToken, dummyAccessToken);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
