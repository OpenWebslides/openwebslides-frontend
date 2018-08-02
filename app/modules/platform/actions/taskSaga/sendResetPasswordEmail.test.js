// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`sendResetPasswordEmail`, (): void => {

  it(`returns a platform SEND_RESET_PASSWORD_EMAIL action containing the passed props`, (): void => {
    const dummyEmail = 'foo@bar.com';
    const expectedAction: a.SendResetPasswordEmailAction = {
      type: a.SEND_RESET_PASSWORD_EMAIL,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.sendResetPasswordEmail(dummyEmail);
    expect(actualAction).toEqual(expectedAction);
  });

});
