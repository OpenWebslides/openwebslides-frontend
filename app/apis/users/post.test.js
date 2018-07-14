// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import apis from '..';

describe(`apis.users.post`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<*> => {
    const dummyEmail = 'test@test.be';
    const dummyPassword = 'mahpasswordy0';
    const dummyFirstName = 'Test';
    const dummyLastName = 'Tester';
    const dummyTosAccepted = true;

    fetch.mockResponseOnce(null, { status: 200 });
    await apis.users.post(dummyEmail, dummyFirstName, dummyLastName, dummyPassword, dummyTosAccepted);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/users`);
    expect(mockOptions.method).toBe(httpMethods.POST);
    expect(JSON.parse(mockOptions.body)).toEqual({
      data: {
        type: 'users',
        attributes: {
          email: dummyEmail,
          firstName: dummyFirstName,
          lastName: dummyLastName,
          password: dummyPassword,
          tosAccepted: dummyTosAccepted,
        },
      },
    });
  });

});
