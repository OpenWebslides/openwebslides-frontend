// @flow

import i18next from 'config/i18next';

import CustomError from './CustomError';

describe(`CustomError`, (): void => {

  it(`can be thrown and caught`, (): void => {
    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new CustomError('Test', false);
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(CustomError);
  });

  it(`automatically translates the passed message, if isTranslatable is set to TRUE`, (): void => {
    const dummyTranslatedValue = 'Dummy translated value';
    const dummyTranslatorFunction = jest.fn((): string => dummyTranslatedValue);
    i18next.t = dummyTranslatorFunction;

    let error: typeof Error;
    try {
      // noinspection ExceptionCaughtLocallyJS
      throw new CustomError('Untranslated message', true);
    }
    catch (e) {
      error = e;
    }

    expect(error).toBeInstanceOf(CustomError);
    expect((error: any).message).toBe(dummyTranslatedValue);
  });

});
