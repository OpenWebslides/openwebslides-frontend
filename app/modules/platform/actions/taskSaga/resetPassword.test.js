// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`resetPassword`, (): void => {

  it(`returns a platform RESET_PASSWORD action containing the passed props`, (): void => {
    const dummyPassword = 'P@ssword1';
    const dummyResetPasswordToken = 'dummyResetPasswordToken';
    const expectedAction: a.ResetPasswordAction = {
      type: a.RESET_PASSWORD,
      payload: {
        password: dummyPassword,
        resetPasswordToken: dummyResetPasswordToken,
      },
    };
    const actualAction = actions.resetPassword(dummyPassword, dummyResetPasswordToken);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
