// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPostConfirmation`, (): void => {

  it(`returns an API_POST_CONFIRMATION action containing the passed arguments`, (): void => {
    const dummyConfirmationToken = 'foobarToken';
    const expectedAction: a.ApiPostConfirmationAction = {
      type: a.API_POST_CONFIRMATION,
      payload: {
        confirmationToken: dummyConfirmationToken,
      },
    };
    const actualAction = actions.apiPostConfirmation(dummyConfirmationToken);

    expect(actualAction).toEqual(expectedAction);
  });

});
