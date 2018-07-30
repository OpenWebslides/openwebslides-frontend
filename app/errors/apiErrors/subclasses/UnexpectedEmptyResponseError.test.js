// @flow

import { UnexpectedEmptyResponseError } from '../..';

describe(`UnexpectedEmptyResponseError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnexpectedEmptyResponseError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(UnexpectedEmptyResponseError);
  });

  it(`sets a default message, if no message is passed`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnexpectedEmptyResponseError();
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(UnexpectedEmptyResponseError);
    expect((error: any).message).toBe(`Unexpected empty response data`);
  });

});
