// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiConnection';

import api from '..';

describe(`api.topics.get`, (): void => {

  let dummyTopicId: string;
  let dummyToken: string;

  beforeEach((): void => {
    fetch.resetMocks();

    dummyTopicId = 'dummyTopicId';
    dummyToken = 'dummyToken';
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.get(dummyTopicId, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    const includes = ['user', 'upstream', 'forks', 'incomingPullRequests', 'outgoingPullRequests', 'collaborators'].join(encodeURIComponent(','));

    expect(mockUrl).toBe(`${API_URL}/topics/${dummyTopicId}?include=${includes}`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

  it(`omits token when the corresponding parameter is passed as NULL`, async (): Promise<void> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.get(dummyTopicId, null);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    const includes = ['user', 'upstream', 'forks', 'incomingPullRequests', 'outgoingPullRequests', 'collaborators'].join(encodeURIComponent(','));

    expect(mockUrl).toBe(`${API_URL}/topics/${dummyTopicId}?include=${includes}`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBeUndefined();
  });

});
