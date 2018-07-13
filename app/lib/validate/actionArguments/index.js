// @flow

import _ from 'lodash';

import { InvalidArgumentError } from 'errors';

type ActionArgumentsValidationOptions = {
  throwOnEmptyString: boolean,
  throwOnUndefined: boolean,
  trimString: boolean,
};

const defaultActionArgumentsValidationOptions: ActionArgumentsValidationOptions = {
  throwOnEmptyString: true,
  throwOnUndefined: true,
  trimString: true,
};

const validateActionArguments = (
  argsObject: {},
  argsKeys: Array<string>,
  options: $Shape<ActionArgumentsValidationOptions> = defaultActionArgumentsValidationOptions,
): {} => {
  const mergedOptions = {
    ...defaultActionArgumentsValidationOptions,
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
      if (_.isString(value) && mergedOptions.trimString) {
        newValue = _.trim(value);
      }
      else {
        newValue = value;
      }

      if (mergedOptions.throwOnEmptyString && newValue === '') {
        throw new InvalidArgumentError(`"${key}" cannot be an empty string`);
      }
      else {
        validatedArgsObject[key] = newValue;
      }
    }
  });

  return validatedArgsObject;
};

export type { ActionArgumentsValidationOptions };
export default validateActionArguments;
