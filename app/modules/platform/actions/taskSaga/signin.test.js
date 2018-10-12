// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`signin`, (): void => {

  it(`returns a platform SIGNIN action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const dummyPassword = 'MahPasswordY0';
    const expectedAction: a.SigninAction = {
      type: a.SIGNIN,
      payload: {
        email: dummyEmail,
        password: dummyPassword,
      },
    };
    const actualAction = actions.signin(dummyEmail, dummyPassword);
    expect(actualAction).toStrictEqual(expectedAction);
  });

});
