// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPost`, (): void => {

  let dummyEmail: string;
  let dummyName: string;
  let dummyPassword: string;
  let dummyTosAccepted: true;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyName = 'Test Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;
  });

  it(`returns an API_POST action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPostAction = {
      type: a.API_POST,
      payload: {
        email: dummyEmail,
        name: dummyName,
        password: dummyPassword,
        tosAccepted: dummyTosAccepted,
      },
    };
    const actualAction = actions.apiPost(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);

    expect(actualAction).toStrictEqual(expectedAction);
  });

});
