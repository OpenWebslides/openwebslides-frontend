// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`signinSSO`, (): void => {

  it(`returns a platform signinSSO action containing the passed props`, (): void => {
    const dummyApiToken = 'foobarToken';
    const dummyUserId = 'foobarId';
    const expectedAction: a.SigninSSOAction = {
      type: a.SIGNIN_SSO,
      payload: {
        apiToken: dummyApiToken,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.signinSSO(dummyApiToken, dummyUserId);
    expect(actualAction).toEqual(expectedAction);
  });

});
