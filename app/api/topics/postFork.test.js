// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiConnection';

import api from '..';

describe(`api.topics.postFork`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    const dummyTopicId = 'ThisIsAnId';
    const dummyToken = 'foobarToken';
    fetch.mockResponseOnce('', { status: 201 });
    await api.topics.postFork(dummyTopicId, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/topics/${dummyTopicId}/fork`);
    expect(mockOptions.method).toBe(httpMethods.POST);
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
