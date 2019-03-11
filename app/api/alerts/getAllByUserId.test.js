// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiConnection';

import api from '..';

describe(`api.alerts.getAllByUserId`, (): void => {

  let dummyUserId: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyToken = 'dummyToken';

    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.alerts.getAllByUserId(dummyUserId, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/users/${dummyUserId}/alerts?include=user${encodeURIComponent(',')}topic${encodeURIComponent(',')}pullRequest${encodeURIComponent(',')}subject`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
