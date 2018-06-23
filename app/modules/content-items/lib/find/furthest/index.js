// @flow
/* eslint-disable no-lonely-if */
/**
 * Takes another (simple) find function as an argument and recursively calls it until the furthest
 * contentItem for which the passed predicate function returns TRUE is found.
 */

import type { Identifier } from 'types/model';

import type {
  ContentItem,
  ContentItemsById,
} from '../../../model';
import { validatePredicate } from '../predicate';
import type { SimpleFindFunction, FindFunctionPredicate } from '../types';

const findFurthestRecursive = (
  contentItem: ContentItem,
  contentItemsById: ContentItemsById,
  simpleFindFunction: SimpleFindFunction,
  predicate: ?FindFunctionPredicate,
  processedItemIds: Array<Identifier>,
): ?ContentItem => {
  const simpleFindResult: ?ContentItem = simpleFindFunction(contentItem, contentItemsById);
  let furtherSimpleFindResult: ?ContentItem = null;

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

  // If the previous result is not the furthest simpleFindResult,
  // see if there is a valid further result.
  if (simpleFindResult != null) {
    furtherSimpleFindResult = findFurthestRecursive(
      simpleFindResult,
      contentItemsById,
      simpleFindFunction,
      predicate,
      [...processedItemIds, contentItem.id],
    );
  }

  // If a valid further nested item was found, return that.
  if (furtherSimpleFindResult != null) {
    return furtherSimpleFindResult;
  }
  // If there is no further valid nested item, see what to do with the current contentItem.
  else {
    // If the current contentItem is valid, return it.
    if (isContentItemValid) {
      return contentItem;
    }
    // If this contentItem does not validate, this is a dead end; return NULL.
    else {
      return null;
    }
  }
};

const findFurthest = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
  simpleFindFunction: SimpleFindFunction,
  predicate: ?FindFunctionPredicate = null,
): ?ContentItem => {
  if (contentItem == null) {
    return null;
  }
  else {
    return findFurthestRecursive(contentItem, contentItemsById, simpleFindFunction, predicate, []);
  }
};

export default findFurthest;
