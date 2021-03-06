// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiConnection';

import api from '..';

describe(`api.topics.post`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    const dummyUserId = 'ThisIsAnId';
    const dummyTitle = 'Lorem ipsum dolor sit amet';
    const dummyDescription = 'Topic description goes here';
    const dummyRootContentItemId = 'foobarId';
    const dummyToken = 'foobarToken';
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.post(dummyTitle, dummyDescription, dummyRootContentItemId, dummyUserId, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/topics`);
    expect(mockOptions.method).toBe(httpMethods.POST);
    expect(JSON.parse(mockOptions.body)).toStrictEqual({
      data: {
        type: 'topics',
        attributes: {
          title: dummyTitle,
          description: dummyDescription,
          access: 'public',
          rootContentItemId: dummyRootContentItemId,
        },
        relationships: {
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
