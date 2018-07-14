// @flow

import { API_URL } from 'config/api';
import { httpMethods } from 'lib/ApiRequest';

import apis from '..';

describe(`apis.token.destroy`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<*> => {
    const dummyToken = 'foobarToken';
    fetch.mockResponseOnce(null, { status: 200 });
    await apis.token.destroy(dummyToken);

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/token`);
    expect(mockOptions.method).toBe(httpMethods.DELETE);
    expect(mockOptions.body).toBeNull();
    expect(mockOptions.headers.Authorization).toBe(`Bearer ${dummyToken}`);
  });

});
