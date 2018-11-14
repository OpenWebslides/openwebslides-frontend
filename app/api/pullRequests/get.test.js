// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.pullRequests.get`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<mixed> => {
    const dummyPullRequestId = 'dummyPullRequestId';
    fetch.mockResponseOnce('', { status: 200 });
    await api.pullRequests.get(dummyPullRequestId);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/pullRequests/${dummyPullRequestId}`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
  });

});
