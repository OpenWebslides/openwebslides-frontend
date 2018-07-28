// @flow

import {
  Http401UnauthorizedError,
  Http403ForbiddenError,
  Http422ValidationError,
  Http5xxServerError,
  UnexpectedHttpStatusError,
} from 'errors';

import fetchApiResponseData from '.';

describe(`fetchApiResponseData`, (): void => {

  beforeEach((): void => {
    fetch.resetMocks();
  });

  it(`returns a ResponseData object with the correct body data`, async (): Promise<mixed> => {
    const dummyBody = { foo: 'bar' };
    fetch.mockResponseOnce(JSON.stringify(dummyBody), { status: 200 });

    await expect(fetchApiResponseData('', {}))
      .resolves
      .toEqual({
        body: dummyBody,
        status: 200,
        token: null,
      });
  });

  it(`returns a ResponseData object with an empty body on empty response body`, async (): Promise<mixed> => {
    fetch.mockResponseOnce('', { status: 204 });

    await expect(fetchApiResponseData('', {}))
      .resolves
      .toEqual({
        body: {},
        status: 204,
        token: null,
      });
  });

  it(`returns a ResponseData object with the correct token`, async (): Promise<mixed> => {
    const dummyToken = 'foobarToken';
    fetch.mockResponseOnce(
      '',
      { status: 200, headers: { Authorization: `Bearer ${dummyToken}` } },
    );

    await expect(fetchApiResponseData('', {}))
      .resolves
      .toEqual({
        body: {},
        status: 200,
        token: dummyToken,
      });
  });

  it(`throws an Http401UnauthorizedError, when the response contains a 401 status code`, async (): Promise<mixed> => {
    fetch.mockResponseOnce('', { status: 401 });

    await expect(fetchApiResponseData('', {}))
      .rejects
      .toThrow(Http401UnauthorizedError);
  });

  it(`throws an Http403ForbiddenError, when the response contains a 403 status code`, async (): Promise<mixed> => {
    fetch.mockResponseOnce('', { status: 403 });

    await expect(fetchApiResponseData('', {}))
      .rejects
      .toThrow(Http403ForbiddenError);
  });

  it(`throws an Http422ValidationError, when the response contains a 422 status code`, async (): Promise<mixed> => {
    const dummyErrorText = `foo`;
    fetch.mockResponseOnce(JSON.stringify({ errors: dummyErrorText }), { status: 422 });

    await expect(fetchApiResponseData('', {}))
      .rejects
      .toThrow(new Http422ValidationError(dummyErrorText));
  });

  it(`throws an Http5xxServerError, when the response contains a 5xx status code`, async (): Promise<mixed> => {
    const dummyErrorText = `Service unavailable`;
    fetch.mockResponseOnce('', { status: 503, statusText: dummyErrorText });

    await expect(fetchApiResponseData('', {}))
      .rejects
      .toThrow(new Http5xxServerError(dummyErrorText));
  });

  it(`throws an UnexpectedHttpStatusError, when the response contains a status code that is not otherwise handled`, async (): Promise<mixed> => {
    const dummyErrorText = `I'm a teapot`;
    fetch.mockResponseOnce('', { status: 418, statusText: dummyErrorText });

    await expect(fetchApiResponseData('', {}))
      .rejects
      .toThrow(new UnexpectedHttpStatusError(dummyErrorText));
  });

});
