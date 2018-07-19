// @flow

import * as t from '../../actionTypes';

import actions from '.';

describe(`resendConfirmationEmail`, (): void => {

  it(`returns a platform RESEND_CONFIRMATION_EMAIL action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const expectedAction: t.ResendConfirmationEmailAction = {
      type: t.RESEND_CONFIRMATION_EMAIL,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.resendConfirmationEmail(dummyEmail);
    expect(actualAction).toEqual(expectedAction);
  });

});
