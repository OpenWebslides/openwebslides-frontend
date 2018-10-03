// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`setUserAuth`, (): void => {

  it(`returns a platform setUserAuth action containing the passed props`, (): void => {
    const dummyApiToken = 'foobarToken';
    const dummyUserId = 'foobarId';
    const expectedAction: a.SetUserAuthAction = {
      type: a.SET_USER_AUTH,
      payload: {
        apiToken: dummyApiToken,
        userId: dummyUserId,
      },
    };
    const actualAction = actions.setUserAuth(dummyApiToken, dummyUserId);
    expect(actualAction).toEqual(expectedAction);
  });

});
