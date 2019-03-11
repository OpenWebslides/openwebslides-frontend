// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiConnection';

import api from '..';

describe(`api.token.patch`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    const dummyRefreshToken = 'dummyRefreshToken';
    fetch.mockResponseOnce('', { status: 200 });
    await api.token.patch(dummyRefreshToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/token`);
    expect(mockOptions.method).toBe(httpMethods.PATCH);
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyRefreshToken}`);
  });

});
