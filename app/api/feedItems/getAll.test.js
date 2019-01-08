// @flow

import { API_URL } from 'config/url';
import { httpMethods } from 'lib/ApiRequest';

import api from '..';

describe(`api.feedItems.getAll`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`executes the correct fetch call`, async (): Promise<void> => {
    fetch.mockResponseOnce('', { status: 200 });
    await api.feedItems.getAll();

    expect(fetch.mock.calls).toHaveLength(1);

    const mockUrl = fetch.mock.calls[0][0];
    const mockOptions = fetch.mock.calls[0][1];

    expect(mockUrl).toBe(`${API_URL}/feedItems?sort=-createdAt&page%5Blimit%5D=10&page%5Boffset%5D=0&include=user`);
    expect(mockOptions.method).toBe(httpMethods.GET);
    expect(mockOptions.body).toBeNull();
  });

});
