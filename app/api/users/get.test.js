// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.users.get`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<mixed> => {
    const dummyUserId = 'ThisIsAnId';
    const dummyToken = 'foobarToken';

    fetch.mockResponseOnce(null, { status: 200 });
    await api.users.get(dummyUserId, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/users/${dummyUserId}`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
