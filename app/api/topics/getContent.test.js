// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.topics.getContent`, (): void => {

  let dummyTopicId: string;
  let dummyToken: string;

  beforeEach((): void => {
    fetch.resetMocks();

    dummyTopicId = 'dummyTopicId';
    dummyToken = 'dummyToken';
  });

  it(`executes the correct fetch call`, async (): Promise<mixed> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.getContent(dummyTopicId, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/topics/${dummyTopicId}/content`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

  it(`omits token when the corresponding parameter is passed as NULL`, async (): Promise<mixed> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.getContent(dummyTopicId, null);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/topics/${dummyTopicId}/content`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBeUndefined();
  });

});
