// @flow

/**
 * Takes another (single) find function as an argument and recursively calls it until the closest
 * contentItem for which the passed predicate function returns TRUE is found.
 */

import * as m from '../../../model';
import validatePredicate from '../validatePredicate';
import {
  type SingleFindFunction,
  type FindFunctionPredicate,
  type RecursiveFindFunction,
} from '../types';

const findClosestRecursive = (
  contentItem: m.ContentItem,
  contentItemsById: m.ContentItemsById,
  singleFindFunction: SingleFindFunction,
  predicate: ?FindFunctionPredicate,
  processedItemIds: $ReadOnlyArray<string>,
): ?m.ContentItem => {
  const singleFindResult: ?m.ContentItem = singleFindFunction(contentItem, contentItemsById);

  if (singleFindResult == null) {
    return null;
  }
  else if (validatePredicate(
    predicate,
    singleFindResult,
    [...processedItemIds, contentItem.id],
    contentItemsById,
  )) {
    return singleFindResult;
  }
  else {
    return findClosestRecursive(
      singleFindResult,
      contentItemsById,
      singleFindFunction,
      predicate,
      [...processedItemIds, contentItem.id],
    );
  }
};

const findClosest: RecursiveFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
  singleFindFunction: SingleFindFunction,
  predicate: ?FindFunctionPredicate = null,
): ?m.ContentItem => {
  if (contentItem == null) {
    return null;
  }
  else {
    return findClosestRecursive(contentItem, contentItemsById, singleFindFunction, predicate, []);
  }
};

export default findClosest;
