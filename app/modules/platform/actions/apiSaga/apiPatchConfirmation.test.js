// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPatchConfirmation`, (): void => {

  it(`returns an API_PATCH_CONFIRMATION action containing the passed arguments`, (): void => {
    const dummyConfirmationToken = 'foobarToken';
    const expectedAction: a.ApiPatchConfirmationAction = {
      type: a.API_PATCH_CONFIRMATION,
      payload: {
        confirmationToken: dummyConfirmationToken,
      },
    };
    const actualAction = actions.apiPatchConfirmation(dummyConfirmationToken);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
