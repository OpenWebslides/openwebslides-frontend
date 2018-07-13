// @flow

import ApiError from './ApiError';

describe(`ApiError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new ApiError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(ApiError);
  });

});
