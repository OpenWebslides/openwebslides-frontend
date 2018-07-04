// @flow
/**
 * Takes another (single) find function as an argument and recursively calls it until the closest
 * contentItem for which the passed predicate function returns TRUE is found.
 */

import type { Identifier } from 'types/model';

import * as model from '../../../model';
import validatePredicate from '../validatePredicate';
import type { SingleFindFunction, FindFunctionPredicate, RecursiveFindFunction } from '../types';

const { ContentItem, ContentItemsById } = model;

const findClosestRecursive = (
  contentItem: ContentItem,
  contentItemsById: ContentItemsById,
  singleFindFunction: SingleFindFunction,
  predicate: ?FindFunctionPredicate,
  processedItemIds: Array<Identifier>,
): ?ContentItem => {
  const singleFindResult: ?ContentItem = singleFindFunction(contentItem, contentItemsById);

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
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
  singleFindFunction: SingleFindFunction,
  predicate: ?FindFunctionPredicate = null,
): ?ContentItem => {
  if (contentItem == null) {
    return null;
  }
  else {
    return findClosestRecursive(contentItem, contentItemsById, singleFindFunction, predicate, []);
  }
};

export default findClosest;
