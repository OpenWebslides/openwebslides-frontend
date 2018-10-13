// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`resetPassword`, (): void => {

  it(`returns a platform RESET_PASSWORD action containing the passed props`, (): void => {
    const dummyPassword = 'P@ssword1';
    const dummyToken = 'foobarToken';
    const expectedAction: a.ResetPasswordAction = {
      type: a.RESET_PASSWORD,
      payload: {
        password: dummyPassword,
        resetPasswordToken: dummyToken,
      },
    };
    const actualAction = actions.resetPassword(dummyPassword, dummyToken);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
