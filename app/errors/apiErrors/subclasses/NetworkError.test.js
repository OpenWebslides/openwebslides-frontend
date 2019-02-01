// @flow

import { NetworkError } from '../..';

describe(`NetworkError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new NetworkError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(NetworkError);
  });

  it(`sets a default message, if no message is passed`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new NetworkError();
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(NetworkError);
    expect((error: any).message).toBe(`Network error`);
  });

});
