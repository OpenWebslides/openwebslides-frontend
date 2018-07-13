// @flow

import { InvalidArgumentError } from '../..';

describe(`InvalidArgumentError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new InvalidArgumentError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(InvalidArgumentError);
  });

});
