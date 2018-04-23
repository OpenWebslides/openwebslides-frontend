// @flow

import asyncFetch from '../asyncFetch';

import {
  UnauthorizedApiError,
  ForbiddenApiError,
  ClientApiError,
  ServerApiError,
} from '../errors';

const mockFetch = (response: Object): void => {
  global.fetch = jest.fn().mockImplementation((): Promise<Object> => {
    return new Promise((resolve: Function): void => {
      resolve(response);
    });
  });
};

describe(`asyncFetch`, (): void => {
  it(`fetches successfully`, (): void => {
    mockFetch({
      status: 200,
      json: (): Object => {
        return { foo: 'bar' };
      },
    });

    const response = asyncFetch('', {});

    response.then((result: string): void => {
      expect(result).toEqual({ foo: 'bar' });
    });
  });

  it(`throws UnauthorizedApiError on 401`, async (): Promise<void> => {
    mockFetch({ status: 401 });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new UnauthorizedApiError());
  });

  it(`throws ForbiddenApiError on 403`, async (): Promise<void> => {
    mockFetch({ status: 403 });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new ForbiddenApiError());
  });

  it(`throws ClientApiError on 422`, async (): Promise<void> => {
    mockFetch({
      status: 422,
      json: (): Object => {
        return {
          errors: { foo: 'bar' },
        };
      },
    });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new ClientApiError({ foo: 'bar' }));
  });

  it(`throws ServerApiError on > 500`, async (): Promise<void> => {
    mockFetch({ status: 503, statusText: 'Service Unavailable' });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new ServerApiError('Service Unavailable'));
  });

  it(`throws ServerApiError on other 4xx errors`, async (): Promise<void> => {
    mockFetch({ status: 418, statusText: 'I\'m a teapot' });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new ClientApiError('I\'m a teapot'));
  });
});
