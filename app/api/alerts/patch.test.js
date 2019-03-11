// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiConnection';

import api from '..';

describe(`api.alerts.patch`, (): void => {

  let dummyId: string;
  let dummyRead: boolean;
  let dummyToken: string;

  beforeEach((): void => {
    dummyId = 'dummyId';
    dummyRead = true;
    dummyToken = 'dummyToken';

    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.alerts.patch(dummyId, dummyRead, dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/alerts/${dummyId}`);
    expect(mockOptions.method).toBe(httpMethods.PATCH);
    expect(JSON.parse(mockOptions.body)).toStrictEqual({
      data: {
        type: 'alerts',
        id: dummyId,
        attributes: {
          read: dummyRead,
        },
      },
    });
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
