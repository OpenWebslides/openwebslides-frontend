// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`confirmEmail`, (): void => {

  it(`returns a platform CONFIRM_EMAIL action containing the passed props`, (): void => {
    const dummyConfirmationToken = 'foobarToken';
    const expectedAction: a.ConfirmEmailAction = {
      type: a.CONFIRM_EMAIL,
      payload: {
        confirmationToken: dummyConfirmationToken,
      },
    };
    const actualAction = actions.confirmEmail(dummyConfirmationToken);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
