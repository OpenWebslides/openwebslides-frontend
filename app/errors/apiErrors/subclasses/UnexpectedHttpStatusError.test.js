// @flow

import { UnexpectedHttpStatusError } from '../..';

describe(`UnexpectedHttpStatusError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnexpectedHttpStatusError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(UnexpectedHttpStatusError);
  });

});
