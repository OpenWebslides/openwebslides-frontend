// @flow

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';

import validateActionStringArgs from '../string';
import type { ActionStringArgsValidationOptions } from '../string';

describe(`validateActionStringArgs`, (): void => {

  const dummyArg1Key = 'dummyArg1Key';
  const dummyArg2Key = 'dummyArg2Key';
  const dummyArg3Key = 'dummyArg3Key';
  const dummyText1 = 'Lorem ipsum';
  const dummyText2 = 'Dolor sit amet';

  it(`returns an object equal to the argsObject, when all args were valid`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: dummyText2,
    };
    const dummyOptions: ActionStringArgsValidationOptions = {
      throwOnEmpty: true,
      throwOnUndefined: true,
      trim: true,
    };

    const actualReturnValue = validateActionStringArgs(dummyArgsObject, dummyArgsKeys, dummyOptions);
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
    const dummyOptions: ActionStringArgsValidationOptions = {
      throwOnEmpty: false,
      throwOnUndefined: false,
      trim: false,
    };

    const actualReturnValue = validateActionStringArgs(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(dummyArgsObject);
  });

  it(`returns an object that contains all keys from argsKeys, even if their values are undefined`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {};
    const dummyOptions: ActionStringArgsValidationOptions = {
      throwOnEmpty: false,
      throwOnUndefined: false,
      trim: false,
    };

    const expectedReturnValue = {
      [dummyArg1Key]: undefined,
      [dummyArg2Key]: undefined,
    };
    const actualReturnValue = validateActionStringArgs(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(expectedReturnValue);
    // Note: we use lodash' isEmpty() because unlike jest's toEqual({}) it returns FALSE when the
    // object contains keys with undefined values.
    expect(_.isEmpty(actualReturnValue)).toBe(false);
  });

  it(`throws an InvalidArgumentError, when "throwOnEmpty" is set to TRUE and one of the passed args is an empty string`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: '',
    };
    const dummyOptions: ActionStringArgsValidationOptions = {
      throwOnEmpty: true,
      throwOnUndefined: false,
      trim: false,
    };

    expect((): any => validateActionStringArgs(
      dummyArgsObject,
      dummyArgsKeys,
      dummyOptions,
    )).toThrow(InvalidArgumentError);
  });

  it(`uses a default value of TRUE, when the "throwOnEmpty" option is not set`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: '',
    };

    expect((): any => validateActionStringArgs(
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
    const dummyOptions: ActionStringArgsValidationOptions = {
      throwOnEmpty: false,
      throwOnUndefined: true,
      trim: false,
    };

    expect((): any => validateActionStringArgs(
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
    const dummyOptions: ActionStringArgsValidationOptions = {
      throwOnEmpty: false,
      throwOnUndefined: true,
      trim: false,
    };

    expect((): any => validateActionStringArgs(
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

    expect((): any => validateActionStringArgs(
      dummyArgsObject,
      dummyArgsKeys,
    )).toThrow(InvalidArgumentError);
  });

  it(`trims all passed args, when "trim" is set to TRUE and the passed args contain unnecessary whitespace`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: `   ${dummyText1}   `,
      [dummyArg2Key]: `   ${dummyText2}   `,
    };
    const dummyOptions: ActionStringArgsValidationOptions = {
      throwOnEmpty: false,
      throwOnUndefined: false,
      trim: true,
    };
    const expectedReturnValue = {
      [dummyArg1Key]: dummyText1,
      [dummyArg2Key]: dummyText2,
    };

    const actualReturnValue = validateActionStringArgs(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(expectedReturnValue);
  });

  it(`uses a default value of TRUE, when the "trim" option is not set`, (): void => {
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

    const actualReturnValue = validateActionStringArgs(dummyArgsObject, dummyArgsKeys);
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
    const dummyOptions: ActionStringArgsValidationOptions = {
      throwOnEmpty: true,
      throwOnUndefined: true,
      trim: true,
    };

    const actualReturnValue = validateActionStringArgs(dummyArgsObject, dummyArgsKeys, dummyOptions);
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
      trim: false,
    };

    const actualReturnValue = validateActionStringArgs(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).toEqual(dummyArgsObject);
  });

  it(`does not mutate the stringArgs object`, (): void => {
    const dummyArgsKeys = [
      dummyArg1Key,
      dummyArg2Key,
    ];
    const dummyArgsObject = {
      [dummyArg1Key]: `   ${dummyText1}   `,
      [dummyArg2Key]: `   ${dummyText2}   `,
    };
    const dummyArgsObjectCopy = { ...dummyArgsObject };
    const dummyOptions: ActionStringArgsValidationOptions = {
      throwOnEmpty: false,
      throwOnUndefined: false,
      trim: true,
    };

    const actualReturnValue = validateActionStringArgs(dummyArgsObject, dummyArgsKeys, dummyOptions);
    expect(actualReturnValue).not.toBe(dummyArgsObject);
    expect(dummyArgsObject).toEqual(dummyArgsObjectCopy);
  });

});
