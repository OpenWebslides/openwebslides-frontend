// @flow

import { UnexpectedEmptyResponseError } from '../..';

describe(`UnexpectedEmptyResponseError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new UnexpectedEmptyResponseError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(UnexpectedEmptyResponseError);
  });

});
