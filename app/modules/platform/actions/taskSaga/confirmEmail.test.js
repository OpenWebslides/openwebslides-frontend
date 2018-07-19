// @flow

import * as t from '../../actionTypes';

import actions from '.';

describe(`confirmEmail`, (): void => {

  it(`returns a platform CONFIRM_EMAIL action containing the passed props`, (): void => {
    const dummyConfirmationToken = 'foobarToken';
    const expectedAction: t.ConfirmEmailAction = {
      type: t.CONFIRM_EMAIL,
      payload: {
        confirmationToken: dummyConfirmationToken,
      },
    };
    const actualAction = actions.confirmEmail(dummyConfirmationToken);
    expect(actualAction).toEqual(expectedAction);
  });

});
