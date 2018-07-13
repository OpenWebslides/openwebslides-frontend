// @flow

import ImplementationError from './ImplementationError';

describe(`ImplementationError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new ImplementationError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(ImplementationError);
  });

});
