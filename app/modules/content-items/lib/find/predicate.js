// @flow

import type { Identifier } from 'types/model';

import type {
  ContentItem,
  ContentItemsById,
} from '../../model';
import type { FindFunctionPredicate } from './types';

export const validatePredicate = (
  predicate: ?FindFunctionPredicate,
  contentItem: ContentItem,
  processedItemIds: Array<Identifier>,
  contentItemsById: ContentItemsById,
): boolean => {
  if (predicate == null) {
    return true;
  }
  else {
    return predicate(contentItem, processedItemIds, contentItemsById);
  }
};
