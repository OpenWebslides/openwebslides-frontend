// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.topics.getAllByUserId`, (): void => {

  let dummyUserId: string;
  let dummyToken: string;

  beforeEach((): void => {
    fetch.resetMocks();

    dummyUserId = 'dummyUserId';
    dummyToken = 'dummyToken';
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.getAllByUserId(dummyUserId, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/users/${dummyUserId}/topics`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

  it(`omits token when the corresponding parameter is passed as NULL`, async (): Promise<void> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.getAllByUserId(dummyUserId, null);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/users/${dummyUserId}/topics`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBeUndefined();
  });

});
