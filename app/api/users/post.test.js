// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.users.post`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    const dummyEmail = 'test@test.be';
    const dummyPassword = 'mahpasswordy0';
    const dummyName = 'Test Tester';
    const dummyTosAccepted = true;

    fetch.mockResponseOnce('', { status: 200 });
    await api.users.post(dummyEmail, dummyName, dummyPassword, dummyTosAccepted);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/users`);
    expect(mockOptions.method).toBe(httpMethods.POST);
    expect(JSON.parse(mockOptions.body)).toStrictEqual({
      data: {
        type: 'users',
        attributes: {
          email: dummyEmail,
          name: dummyName,
          password: dummyPassword,
          tosAccepted: dummyTosAccepted,
        },
      },
    });
  });

});
