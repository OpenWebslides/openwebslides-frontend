// @flow

import _ from 'lodash';

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';

import validateActionArguments from '..';

import type { ActionArgumentsValidationOptions } from '..';

describe(`validateActionArguments`, (): void => {

  let dummyArg1Key: string;
  let dummyArg2Key: string;
  let dummyArg3Key: string;
  let dummyText1: string;
  let dummyText2: string;

  beforeEach((): void => {
    dummyArg1Key = 'dummyArg1Key';
    dummyArg2Key = 'dummyArg2Key';
    dummyArg3Key = 'dummyArg3Key';
    dummyText1 = 'Lorem ipsum';
    dummyText2 = 'Dolor sit amet';
  });

  it(`returns an object equal to the argsObject, when all args were valid`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: dummyText2,
    };
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: true,
      throwOnUndefined: true,
      trimString: true,
    };

    const actualReturnValue = validateActionArguments(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(dummyArgsObject);
  });

  it(`returns an object equal to the argsObject, when all options are set to FALSE and the argsObject contain empty or undefined values`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
      dummyArg3Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: `   ${dummyText1}   `,
      [dummyArg2Key]: '',
      [dummyArg3Key]: undefined,
    };
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: false,
      throwOnUndefined: false,
      trimString: false,
    };

    const actualReturnValue = validateActionArguments(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(dummyArgsObject);
  });

  it(`returns an object that contains all keys from argsKeys, even if their values are undefined`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {};
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: false,
      throwOnUndefined: false,
      trimString: false,
    };

    const expectedReturnValue = {
      [dummyArg1Key]: undefined,
      [dummyArg2Key]: undefined,
    };
    const actualReturnValue = validateActionArguments(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(expectedReturnValue);
    // Note: we use lodash' isEmpty() because unlike jest's toEqual({}) it returns FALSE when the
    // object contains keys with undefined values.
    expect(_.isEmpty(actualReturnValue)).toBe(false);
  });

  it(`throws an InvalidArgumentError, when "throwOnEmptyString" is set to TRUE and one of the passed args is an empty string`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: '',
    };
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: true,
      throwOnUndefined: false,
      trimString: false,
    };

    expect((): any => validateActionArguments(
      dummyArgsObject,
      dummyArgsKeys,
      dummyOptions,
    )).toThrow(InvalidArgumentError);
  });

  it(`uses a default value of TRUE, when the "throwOnEmptyString" option is not set`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: '',
    };

    expect((): any => validateActionArguments(
      dummyArgsObject,
      dummyArgsKeys,
    )).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when "throwOnUndefined" is set to TRUE and one of the passed argsKeys is undefined in the argsObject`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: undefined,
    };
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: false,
      throwOnUndefined: true,
      trimString: false,
    };

    expect((): any => validateActionArguments(
      dummyArgsObject,
      dummyArgsKeys,
      dummyOptions,
    )).toThrow(InvalidArgumentError);
  });

  it(`throws an InvalidArgumentError, when "throwOnUndefined" is set to TRUE and one of the passed argsKeys is not present in the argsObject`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
    };
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: false,
      throwOnUndefined: true,
      trimString: false,
    };

    expect((): any => validateActionArguments(
      dummyArgsObject,
      dummyArgsKeys,
      dummyOptions,
    )).toThrow(InvalidArgumentError);
  });

  it(`uses a default value of TRUE, when the "throwOnUndefined" option is not set`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: undefined,
    };

    expect((): any => validateActionArguments(
      dummyArgsObject,
      dummyArgsKeys,
    )).toThrow(InvalidArgumentError);
  });

  it(`trims all passed args, when "trimString" is set to TRUE and the passed args contain unnecessary whitespace`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: `   ${dummyText1}   `,
      [dummyArg2Key]: `   ${dummyText2}   `,
    };
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: false,
      throwOnUndefined: false,
      trimString: true,
    };
    const expectedReturnValue = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: dummyText2,
    };

    const actualReturnValue = validateActionArguments(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(expectedReturnValue);
  });

  it(`uses a default value of TRUE, when the "trimString" option is not set`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: `   ${dummyText1}   `,
      [dummyArg2Key]: `   ${dummyText2}   `,
    };
    const expectedReturnValue = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: dummyText2,
    };

    const actualReturnValue = validateActionArguments(dummyArgsObject, dummyArgsKeys);
    expect(actualReturnValue).toEqual(expectedReturnValue);
  });

  it(`allows NULL values to pass through unchanged`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: null,
    };
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: true,
      throwOnUndefined: true,
      trimString: true,
    };

    const actualReturnValue = validateActionArguments(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(dummyArgsObject);
  });

  it(`allows non-string values to pass through unchanged`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
      dummyArg3Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: 666,
      [dummyArg3Key]: true,
    };
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: true,
      throwOnUndefined: true,
      trimString: true,
    };

    const actualReturnValue = validateActionArguments(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(dummyArgsObject);
  });

  it(`correctly overrides the default option values, when a subset of options is passed`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: `   ${dummyText1}   `,
      [dummyArg2Key]: `   ${dummyText2}   `,
    };
    const dummyOptions = {
      trimString: false,
    };

    const actualReturnValue = validateActionArguments(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(dummyArgsObject);
  });

  it(`does not mutate the argsObject`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: `   ${dummyText1}   `,
      [dummyArg2Key]: `   ${dummyText2}   `,
    };
    const dummyArgsObjectCopy = { ...dummyArgsObject };
    const dummyOptions: ActionArgumentsValidationOptions = {
      throwOnEmptyString: false,
      throwOnUndefined: false,
      trimString: true,
    };

    const actualReturnValue = validateActionArguments(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).not.toBe(dummyArgsObject);
    expect(dummyArgsObject).toEqual(dummyArgsObjectCopy);
  });

});
