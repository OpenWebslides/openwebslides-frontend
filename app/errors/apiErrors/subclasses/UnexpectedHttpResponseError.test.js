// @flow

import { UnexpectedHttpResponseError } from '../..';

describe(`UnexpectedHttpResponseError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnexpectedHttpResponseError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(UnexpectedHttpResponseError);
  });

  it(`sets a default message, if no message is passed`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnexpectedHttpResponseError();
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(UnexpectedHttpResponseError);
    expect((error: any).message).toBe(`Unexpected empty response data`);
  });

});
