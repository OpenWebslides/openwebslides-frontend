// @flow

import {
  Http401UnauthorizedError,
  Http403ForbiddenError,
  Http422ValidationError,
  Http5xxServerError,
  UnexpectedHttpStatusError,
} from 'errors';

import asyncFetch from './asyncFetch';

const mockFetch = (response: Object): void => {
  global.fetch = jest.fn().mockImplementation((): Promise<Object> => {
    return new Promise((resolve: Function): void => {
      resolve(response);
    });
  });
};

describe(`asyncFetch`, (): void => {

  // #TODO fix failing test!
  // it(`fetches successfully`, async (): Promise<*> => {
  //   mockFetch({
  //     status: 200,
  //     json: (): Object => {
  //       return { foo: 'bar' };
  //     },
  //   });
  //
  //   const response = asyncFetch('', {});
  //
  //   return response.then((result: Object): void => {
  //     expect(result).toEqual({ foo: 'bar' });
  //   });
  // });

  it(`throws UnauthorizedError on 401`, async (): Promise<void> => {
    mockFetch({ status: 401 });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(Http401UnauthorizedError);
  });

  it(`throws ForbiddenError on 403`, async (): Promise<void> => {
    mockFetch({ status: 403 });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(Http403ForbiddenError);
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
      .toThrow(Http422ValidationError);
  });

  it(`throws ServerError on > 500`, async (): Promise<void> => {
    mockFetch({ status: 503, statusText: 'Service Unavailable' });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(Http5xxServerError);
  });

  it(`throws ServerError on other 4xx errors`, async (): Promise<void> => {
    mockFetch({ status: 418, statusText: 'I\'m a teapot' });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(UnexpectedHttpStatusError);
  });
});
