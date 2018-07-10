// @flow

import type { Identifier } from 'types/model';

import * as model from '../../model';
import type { FindFunctionPredicate } from './types';

const {
  ContentItem,
  ContentItemsById,
} = model;

const validatePredicate = (
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

export default validatePredicate;
