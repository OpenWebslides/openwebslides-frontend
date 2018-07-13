// @flow

import { Http5xxServerError } from '../..';

describe(`Http5xxServerError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new Http5xxServerError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Http5xxServerError);
  });

});
