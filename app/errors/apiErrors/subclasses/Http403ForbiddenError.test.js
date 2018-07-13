// @flow

import { Http403ForbiddenError } from '../..';

describe(`Http403ForbiddenError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new Http403ForbiddenError();
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Http403ForbiddenError);
  });

});
