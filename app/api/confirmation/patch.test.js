// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.confirmation.patch`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<mixed> => {
    const dummyConfirmationToken = 'foobarToken';
    fetch.mockResponseOnce('', { status: 200 });
    await api.confirmation.patch(dummyConfirmationToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/confirmation`);
    expect(mockOptions.method).toBe(httpMethods.PATCH);
    expect(JSON.parse(mockOptions.body)).toStrictEqual({
      data: {
        type: 'confirmations',
        attributes: {
          confirmationToken: dummyConfirmationToken,
        },
      },
    });
  });

});
