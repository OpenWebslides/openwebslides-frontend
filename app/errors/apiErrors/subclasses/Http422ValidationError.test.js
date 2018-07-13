// @flow

import { Http422ValidationError } from '../..';

describe(`Http422ValidationError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new Http422ValidationError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(Http422ValidationError);
  });

});
