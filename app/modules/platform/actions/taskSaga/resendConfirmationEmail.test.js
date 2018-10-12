// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`resendConfirmationEmail`, (): void => {

  it(`returns a platform RESEND_CONFIRMATION_EMAIL action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const expectedAction: a.ResendConfirmationEmailAction = {
      type: a.RESEND_CONFIRMATION_EMAIL,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.resendConfirmationEmail(dummyEmail);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
