// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`apiPostToken`, (): void => {

  it(`returns a platform API_POST_TOKEN action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const dummyPassword = 'MahPasswordY0';
    const expectedAction: a.ApiPostToken = {
      type: a.API_POST_TOKEN,
      payload: {
        email: dummyEmail,
        password: dummyPassword,
      },
    };
    const actualAction = actions.apiPostToken(dummyEmail, dummyPassword);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
