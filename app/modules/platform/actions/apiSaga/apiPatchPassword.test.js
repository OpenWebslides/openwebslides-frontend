// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPatchPassword`, (): void => {

  it(`returns an API_PATCH_PASSWORD action containing the passed arguments`, (): void => {
    const dummyPassword = 'P@ssword1';
    const dummyResetPasswordToken = 'foobarToken';
    const expectedAction: a.ApiPatchPasswordAction = {
      type: a.API_PATCH_PASSWORD,
      payload: {
        password: dummyPassword,
        resetPasswordToken: dummyResetPasswordToken,
      },
    };
    const actualAction = actions.apiPatchPassword(dummyPassword, dummyResetPasswordToken);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
