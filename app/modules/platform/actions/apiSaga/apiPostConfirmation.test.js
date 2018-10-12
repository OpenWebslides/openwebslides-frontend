// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPostConfirmation`, (): void => {

  it(`returns an API_POST_CONFIRMATION action containing the passed arguments`, (): void => {
    const dummyEmail = 'foo@bar.com';
    const expectedAction: a.ApiPostConfirmationAction = {
      type: a.API_POST_CONFIRMATION,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.apiPostConfirmation(dummyEmail);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
