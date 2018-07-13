// @flow

import { NotYetImplementedError } from '../..';

describe(`NotYetImplementedError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new NotYetImplementedError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(NotYetImplementedError);
  });

  it(`sets a default message, if no message is passed`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new NotYetImplementedError();
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(NotYetImplementedError);
    expect((error: any).message).toBe(`This functionality has not yet been implemented.`);
  });

});
