// @flow

import _ from 'lodash';

import { InvalidArgumentError } from 'errors';

const validateStringProps = <O: {}>(
  stringKeys: $ReadOnlyArray<string>,
  nullableStringKeys: $ReadOnlyArray<string>,
  propsObject: O,
  trim: boolean = true,
): O => {
  stringKeys.forEach((key: string): void => {
    if (!Object.keys(propsObject).includes(key)) throw new InvalidArgumentError(`Key "${key}" from stringKeys could not be found in propsObject.`);
  });
  nullableStringKeys.forEach((key: string): void => {
    if (!Object.keys(propsObject).includes(key)) throw new InvalidArgumentError(`Key "${key}" from nullableStringKeys could not be found in propsObject.`);
  });

  const validatedPropsObject = { ...propsObject };
  let validatedValue: ?string;

  [...stringKeys, ...nullableStringKeys].forEach((key: string): void => {
    validatedValue = (trim) ? _.trim(propsObject[key]) : propsObject[key];
    validatedValue = (validatedValue === '') ? null : validatedValue;
    validatedPropsObject[key] = validatedValue;
  });

  stringKeys.forEach((key: string): void => {
    if (validatedPropsObject[key] === null) {
      throw new InvalidArgumentError(`"${key}" value cannot be NULL.`);
    }
  });

  nullableStringKeys.forEach((key: string): void => {
    if (validatedPropsObject[key] === null) {
      // Omit nullable values that are NULL after conversion
      delete validatedPropsObject[key];
    }
  });

  return validatedPropsObject;
};

export default validateStringProps;
