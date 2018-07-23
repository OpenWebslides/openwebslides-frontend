// @flow

import * as a from '../../actionTypes';

import actions from '..';

describe(`apiPost`, (): void => {

  let dummyEmail: string;
  let dummyFirstName: string;
  let dummyLastName: string;
  let dummyPassword: string;
  let dummyTosAccepted: true;

  beforeEach((): void => {
    dummyEmail = 'test@test.be';
    dummyFirstName = 'Test';
    dummyLastName = 'Tester';
    dummyPassword = 'MahPasswordY0';
    dummyTosAccepted = true;
  });

  it(`returns an API_POST action containing the passed arguments`, (): void => {
    const expectedAction: a.ApiPostAction = {
      type: a.API_POST,
      payload: {
        email: dummyEmail,
        firstName: dummyFirstName,
        lastName: dummyLastName,
        password: dummyPassword,
        tosAccepted: dummyTosAccepted,
      },
    };
    const actualAction = actions.apiPost(dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted);

    expect(actualAction).toEqual(expectedAction);
  });

});
