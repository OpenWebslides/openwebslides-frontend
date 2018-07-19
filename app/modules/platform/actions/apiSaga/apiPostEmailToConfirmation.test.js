// @flow

import * as t from '../../actionTypes';

import actions from '..';

describe(`apiPostEmailToConfirmation`, (): void => {

  it(`returns an API_POST_EMAIL_TO_CONFIRMATION action containing the passed arguments`, (): void => {
    const dummyEmail = 'test@test.be';
    const expectedAction: t.ApiPostEmailToConfirmationAction = {
      type: t.API_POST_EMAIL_TO_CONFIRMATION,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.apiPostEmailToConfirmation(dummyEmail);

    expect(actualAction).toEqual(expectedAction);
  });

});
