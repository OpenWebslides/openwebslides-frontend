// @flow

import * as a from '../../actionTypes';

import actions from '.';

describe(`create`, (): void => {

  it(`returns a users CREATE action containing the passed props`, (): void => {
    const dummyEmail = 'test@test.be';
    const dummyName = 'Test Tester';
    const dummyPassword = 'MahPasswordY0';
    const dummyTosAccepted = true;
    const expectedAction: a.CreateAction = {
      type: a.CREATE,
      payload: {
        email: dummyEmail,
        name: dummyName,
        password: dummyPassword,
        tosAccepted: dummyTosAccepted,
      },
    };
    const actualAction = actions.create(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
