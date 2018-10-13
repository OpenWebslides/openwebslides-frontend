// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPostPassword`, (): void => {

  it(`returns an API_POST_PASSWORD action containing the passed arguments`, (): void => {
    const dummyEmail = 'foo@bar.com';
    const expectedAction: a.ApiPostPasswordAction = {
      type: a.API_POST_PASSWORD,
      payload: {
        email: dummyEmail,
      },
    };
    const actualAction = actions.apiPostPassword(dummyEmail);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
