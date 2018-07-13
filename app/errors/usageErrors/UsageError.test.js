// @flow

import i18next from 'config/i18next';

import UsageError from './UsageError';

describe(`UsageError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    // Prevent error when translator key is not found.
    i18next.t = jest.fn();

    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new UsageError('Test');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(UsageError);
  });

});
