// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.pullRequests.post`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<mixed> => {
    const dummyMessage = 'dummyMessage';
    const dummyTopicId = 'dummyTopicId';
    const dummyUserId = 'dummyUserId';
    const dummyToken = 'dummyToken';
    fetch.mockResponseOnce('', { status: 200 });
    await api.pullRequests.post(dummyMessage, dummyTopicId, dummyUserId, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/pullRequests`);
    expect(mockOptions.method).toBe(httpMethods.POST);
    expect(JSON.parse(mockOptions.body)).toStrictEqual({
      data: {
        type: 'pullRequests',
        attributes: {
          message: dummyMessage,
        },
        relationships: {
          topic: {
            data: {
              type: 'topics',
              id: dummyTopicId,
            },
          },
          user: {
            data: {
              type: 'users',
              id: dummyUserId,
            },
          },
        },
      },
    });
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
