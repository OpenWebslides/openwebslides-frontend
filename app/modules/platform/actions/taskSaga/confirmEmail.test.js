// @flow

import * as t from '../../actionTypes';

import actions from '.';

describe(`confirmEmail`, (): void => {

  it(`returns a platform CONFIRM_EMAIL action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const expectedAction: t.ConfirmEmailAction = {
      type: t.CONFIRM_EMAIL,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.confirmEmail(dummyEmail);
    expect(actualAction).toEqual(expectedAction);
  });

});
