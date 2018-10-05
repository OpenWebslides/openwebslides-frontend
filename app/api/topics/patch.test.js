// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.topics.patch`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<mixed> => {
    const dummyId = 'dummyId';
    const dummyTitle = 'dummyTitle';
    const dummyDescription = 'dummyDescription';
    const dummyToken = 'foobarToken';
    fetch.mockResponseOnce('', { status: 200 });
    await api.topics.patch(dummyId, dummyTitle, dummyDescription, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/topics/${dummyId}`);
    expect(mockOptions.method).toBe(httpMethods.PATCH);
    expect(JSON.parse(mockOptions.body)).toStrictEqual({
      data: {
        type: 'topics',
        attributes: {
          title: dummyTitle,
          description: dummyDescription,
        },
      },
    });
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
