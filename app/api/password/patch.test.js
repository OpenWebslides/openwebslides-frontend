// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiConnection';

import api from '..';

describe(`api.password.patch`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    const dummyPassword = 'P@ssword1';
    const dummyResetPasswordToken = 'foobarToken';
    fetch.mockResponseOnce('', { status: 200 });
    await api.password.patch(dummyPassword, dummyResetPasswordToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/password`);
    expect(mockOptions.method).toBe(httpMethods.PATCH);
    expect(JSON.parse(mockOptions.body)).toStrictEqual({
      data: {
        type: 'passwords',
        attributes: {
          password: dummyPassword,
          resetPasswordToken: dummyResetPasswordToken,
        },
      },
    });
  });

});
