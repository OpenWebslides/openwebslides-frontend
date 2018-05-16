// @flow

import UnauthorizedError from 'errors/api-errors/UnauthorizedError';
import ForbiddenError from 'errors/api-errors/ForbiddenError';
import ValidationError from 'errors/api-errors/ValidationError';
import ServerError from 'errors/api-errors/ServerError';
import ApiError from 'errors/ApiError';

import asyncFetch from '../asyncFetch';

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

    response.then((result: Object): void => {
      expect(result).toEqual({ foo: 'bar' });
    });
  });

  it(`throws UnauthorizedError on 401`, async (): Promise<void> => {
    mockFetch({ status: 401 });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new UnauthorizedError());
  });

  it(`throws ForbiddenError on 403`, async (): Promise<void> => {
    mockFetch({ status: 403 });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new ForbiddenError());
  });

  it(`throws ClientError on 422`, async (): Promise<void> => {
    mockFetch({
      status: 422,
      json: (): Object => {
        return {
          errors: 'foo',
        };
      },
    });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new ValidationError('foo'));
  });

  it(`throws ServerError on > 500`, async (): Promise<void> => {
    mockFetch({ status: 503, statusText: 'Service Unavailable' });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new ServerError('Service Unavailable'));
  });

  it(`throws ServerError on other 4xx errors`, async (): Promise<void> => {
    mockFetch({ status: 418, statusText: 'I\'m a teapot' });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new ApiError('I\'m a teapot'));
  });
});
