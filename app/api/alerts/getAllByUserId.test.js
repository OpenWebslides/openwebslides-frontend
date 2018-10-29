// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.alerts.getAllByUserId`, (): void => {

  let dummyUserId: string;
  let dummyToken: string;

  beforeEach((): void => {
    dummyUserId = 'dummyUserId';
    dummyToken = 'dummyToken';

    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<mixed> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.alerts.getAllByUserId(dummyUserId, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/users/${dummyUserId}/alerts?include=user%2Ctopic%2CpullRequest%2Csubject`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
