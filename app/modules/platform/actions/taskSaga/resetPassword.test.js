// @flow

import * as t from '../../actionTypes';

import actions from '.';

describe(`resetPassword`, (): void => {

  it(`returns a platform RESET_PASSWORD action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const expectedAction: t.ResetPasswordAction = {
      type: t.RESET_PASSWORD,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.resetPassword(dummyEmail);
    expect(actualAction).toEqual(expectedAction);
  });

});
