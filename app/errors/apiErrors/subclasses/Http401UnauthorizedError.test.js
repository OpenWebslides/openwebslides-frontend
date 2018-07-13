// @flow

import { Http401UnauthorizedError } from '../..';

describe(`Http401UnauthorizedError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new Http401UnauthorizedError();
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Http401UnauthorizedError);
  });

});
