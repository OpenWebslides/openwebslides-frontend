// @flow

import * as t from '../../actionTypes';

import actions from '..';

describe(`apiPostConfirmation`, (): void => {

  it(`returns an API_POST_CONFIRMATION action containing the passed arguments`, (): void => {
    const dummyEmail = 'test@test.be';
    const expectedAction: t.ApiPostConfirmationAction = {
      type: t.API_POST_CONFIRMATION,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.apiPostConfirmation(dummyEmail);

    expect(actualAction).toEqual(expectedAction);
  });

});
