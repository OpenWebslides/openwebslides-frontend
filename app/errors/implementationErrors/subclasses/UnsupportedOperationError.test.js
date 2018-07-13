// @flow

import { UnsupportedOperationError } from '../..';

describe(`UnsupportedOperationError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnsupportedOperationError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(UnsupportedOperationError);
  });

});
