// @flow
/**
 * Takes another (simple) find function as an argument and recursively calls it until the closest
 * contentItem for which the passed predicate function returns TRUE is found.
 */

import type { Identifier } from 'types/model';

import type {
  ContentItem,
  ContentItemsById,
} from '../../../model';
import { validatePredicate } from '../predicate';
import type { SimpleFindFunction, FindFunctionPredicate } from '../types';

const findClosestRecursive = (
  contentItem: ContentItem,
  contentItemsById: ContentItemsById,
  simpleFindFunction: SimpleFindFunction,
  predicate: FindFunctionPredicate,
  processedItemIds: Array<Identifier>,
): ?ContentItem => {
  const simpleFindResult: ?ContentItem = simpleFindFunction(contentItem, contentItemsById);

  if (simpleFindResult == null) {
    return null;
  }
  else if (validatePredicate(
    predicate,
    simpleFindResult,
    [...processedItemIds, contentItem.id],
    contentItemsById,
  )) {
    return simpleFindResult;
  }
  else {
    return findClosestRecursive(
      simpleFindResult,
      contentItemsById,
      simpleFindFunction,
      predicate,
      [...processedItemIds, contentItem.id],
    );
  }
};

const findClosest = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
  simpleFindFunction: SimpleFindFunction,
  predicate: FindFunctionPredicate,
): ?ContentItem => {
  if (contentItem == null) {
    return null;
  }
  else {
    return findClosestRecursive(contentItem, contentItemsById, simpleFindFunction, predicate, []);
  }
};

export default findClosest;
