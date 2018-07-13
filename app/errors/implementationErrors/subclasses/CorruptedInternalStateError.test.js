// @flow

import { CorruptedInternalStateError } from '../..';

describe(`CorruptedInternalStateError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new CorruptedInternalStateError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(CorruptedInternalStateError);
  });

});
