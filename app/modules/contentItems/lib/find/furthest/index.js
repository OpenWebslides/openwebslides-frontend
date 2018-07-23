// @flow
/**
 * Takes another (single) find function as an argument and recursively calls it until the furthest
 * contentItem for which the passed predicate function returns TRUE is found.
 */

import * as m from '../../../model';
import validatePredicate from '../validatePredicate';
import type { SingleFindFunction, FindFunctionPredicate, RecursiveFindFunction } from '../types';

const findFurthestRecursive = (
  contentItem: m.ContentItem,
  contentItemsById: m.ContentItemsById,
  singleFindFunction: SingleFindFunction,
  predicate: ?FindFunctionPredicate,
  processedItemIds: Array<string>,
): ?m.ContentItem => {
  const singleFindResult: ?m.ContentItem = singleFindFunction(contentItem, contentItemsById);
  let furtherSingleFindResult: ?m.ContentItem = null;

  // Determine current contentItem validity before the recursive function call
  // in order to make sure that the predicate function calls happen in the correct order.
  let isContentItemValid: boolean;
  // If this is the original contentItem, it isn't a candidate.
  if (processedItemIds.length === 0) {
    isContentItemValid = false;
  }
  // If this is not the original contentItem, check if the predicate returns TRUE.
  else {
    isContentItemValid = validatePredicate(
      predicate,
      contentItem,
      processedItemIds,
      contentItemsById,
    );
  }

  // If the previous result is not the furthest singleFindResult,
  // see if there is a valid further result.
  if (singleFindResult != null) {
    furtherSingleFindResult = findFurthestRecursive(
      singleFindResult,
      contentItemsById,
      singleFindFunction,
      predicate,
      [...processedItemIds, contentItem.id],
    );
  }

  // If a valid further nested item was found, return that.
  if (furtherSingleFindResult != null) {
    return furtherSingleFindResult;
  }
  // If there is no further valid nested item, see what to do with the current contentItem.
  else {
    // If the current contentItem is valid, return it.
    // eslint-disable-next-line no-lonely-if
    if (isContentItemValid) {
      return contentItem;
    }
    // If this contentItem does not validate, this is a dead end; return NULL.
    else {
      return null;
    }
  }
};

const findFurthest: RecursiveFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
  singleFindFunction: SingleFindFunction,
  predicate: ?FindFunctionPredicate = null,
): ?m.ContentItem => {
  if (contentItem == null) {
    return null;
  }
  else {
    return findFurthestRecursive(contentItem, contentItemsById, singleFindFunction, predicate, []);
  }
};

export default findFurthest;
