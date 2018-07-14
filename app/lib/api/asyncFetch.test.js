// @flow

import {
  Http401UnauthorizedError,
  Http403ForbiddenError,
  Http422ValidationError,
  Http5xxServerError,
  UnexpectedHttpStatusError,
} from 'errors';

import asyncFetch from './asyncFetch';

describe(`asyncFetch`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`returns a ResponseData object with the correct body data`, async (): Promise<*> => {
    const dummyBody = { foo: 'bar' };
    fetch.mockResponseOnce(JSON.stringify(dummyBody), { status: 200 });

    await expect(asyncFetch('', {}))
      .resolves
      .toEqual({
        body: dummyBody,
        status: 200,
        token: null,
      });
  });

  it(`returns a ResponseData object with the correct token`, async (): Promise<*> => {
    const dummyToken = 'foobarToken';
    fetch.mockResponseOnce(
      null,
      { status: 200, headers: { Authorization: `Bearer ${dummyToken}` } },
    );

    await expect(asyncFetch('', {}))
      .resolves
      .toEqual({
        body: {},
        status: 200,
        token: dummyToken,
      });
  });

  it(`throws an Http401UnauthorizedError, when the response contains a 401 status code`, async (): Promise<*> => {
    fetch.mockResponseOnce(null, { status: 401 });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(Http401UnauthorizedError);
  });

  it(`throws an Http403ForbiddenError, when the response contains a 403 status code`, async (): Promise<*> => {
    fetch.mockResponseOnce(null, { status: 403 });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(Http403ForbiddenError);
  });

  it(`throws an Http422ValidationError, when the response contains a 422 status code`, async (): Promise<*> => {
    const dummyErrorText = `foo`;
    fetch.mockResponseOnce(JSON.stringify({ errors: dummyErrorText }), { status: 422 });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new Http422ValidationError(dummyErrorText));
  });

  it(`throws an Http5xxServerError, when the response contains a 5xx status code`, async (): Promise<*> => {
    const dummyErrorText = `Service unavailable`;
    fetch.mockResponseOnce(null, { status: 503, statusText: dummyErrorText });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new Http5xxServerError(dummyErrorText));
  });

  it(`throws an UnexpectedHttpStatusError, when the response contains a status code that is not otherwise handled`, async (): Promise<*> => {
    const dummyErrorText = `I'm a teapot`;
    fetch.mockResponseOnce(null, { status: 418, statusText: dummyErrorText });

    await expect(asyncFetch('', {}))
      .rejects
      .toThrow(new UnexpectedHttpStatusError(dummyErrorText));
  });

});
