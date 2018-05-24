// @flow

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';

type ActionStringArgsValidationOptions = {
  throwOnEmpty: boolean,
  throwOnUndefined: boolean,
  trim: boolean,
};

const defaultActionStringArgsValidationOptions: ActionStringArgsValidationOptions = {
  throwOnEmpty: true,
  throwOnUndefined: true,
  trim: true,
};

const validateActionStringArgs = (
  argsObject: {},
  argsKeys: Array<string>,
  options: {} = defaultActionStringArgsValidationOptions,
): {} => {
  const mergedOptions = {
    ...defaultActionStringArgsValidationOptions,
    ...options,
  };
  const validatedArgsObject = {};
  let value: string;
  let newValue: string;

  argsKeys.forEach((key: string): void => {
    value = argsObject[key];

    if (value === null) {
      validatedArgsObject[key] = null;
    }
    else if (value === undefined) {
      if (mergedOptions.throwOnUndefined) {
        throw new InvalidArgumentError(`"${key}" must be defined`);
      }
      else {
        validatedArgsObject[key] = undefined;
      }
    }
    else {
      if (mergedOptions.trim) {
        newValue = _.trim(value);
      }
      else {
        newValue = value;
      }

      if (mergedOptions.throwOnEmpty && newValue === '') {
        throw new InvalidArgumentError(`"${key}" cannot be an empty string`);
      }
      else {
        validatedArgsObject[key] = newValue;
      }
    }
  });

  return validatedArgsObject;
};

export type { ActionStringArgsValidationOptions };
export default validateActionStringArgs;
