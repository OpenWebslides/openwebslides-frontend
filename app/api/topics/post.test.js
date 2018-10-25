// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.topics.post`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<mixed> => {
    const dummyUserId = 'ThisIsAnId';
    const dummyTitle = 'Lorem ipsum dolor sit amet';
    const dummyDescription = 'Topic description goes here';
    const dummyRootContentItemId = 'foobarId';
    const dummyToken = 'foobarToken';
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.post(dummyTitle, dummyRootContentItemId, dummyUserId, dummyToken, { description: dummyDescription });

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
          state: 'public_access',
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

  it(`omits the description value when the corresponding parameter is not passed`, async (): Promise<mixed> => {
    const dummyUserId = 'ThisIsAnId';
    const dummyTitle = 'Lorem ipsum dolor sit amet';
    const dummyRootContentItemId = 'foobarId';
    const dummyToken = 'foobarToken';
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.post(dummyTitle, dummyRootContentItemId, dummyUserId, dummyToken, {});

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
          state: 'public_access',
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
