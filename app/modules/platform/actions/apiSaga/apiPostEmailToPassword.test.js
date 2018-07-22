// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPostEmailToPassword`, (): void => {

  it(`returns an API_POST_EMAIL_TO_PASSWORD action containing the passed arguments`, (): void => {
    const dummyEmail = 'test@test.be';
    const expectedAction: a.ApiPostEmailToPasswordAction = {
      type: a.API_POST_EMAIL_TO_PASSWORD,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.apiPostEmailToPassword(dummyEmail);

    expect(actualAction).toEqual(expectedAction);
  });

});
