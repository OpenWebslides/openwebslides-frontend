// @flow
/**
 * Inserts an element into an array at the given index, without mutating the array.
 */

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';

const insertIntoArray = <T>(array: Array<T>, element: T, index: number): Array<T> => {
  if (index < 0 || index > array.length) throw new InvalidArgumentError(`Index out of bounds.`);

  return [
    ...array.slice(0, index),
    element,
    ...array.slice(index),
  ];
};

export default insertIntoArray;
