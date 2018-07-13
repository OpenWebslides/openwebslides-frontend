// @flow

import i18next from 'config/i18next';

import { ObjectNotFoundError } from '../..';

describe(`ObjectNotFoundError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    // Prevent error when translator key is not found.
    i18next.t = jest.fn();

    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new ObjectNotFoundError('testKey', 'testId');
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(ObjectNotFoundError);
  });

});
