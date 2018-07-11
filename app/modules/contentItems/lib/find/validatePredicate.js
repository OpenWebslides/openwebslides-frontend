// @flow

import type { Identifier } from 'types/model';

import * as m from '../../model';
import type { FindFunctionPredicate } from './types';

const validatePredicate = (
  predicate: ?FindFunctionPredicate,
  contentItem: m.ContentItem,
  processedItemIds: Array<Identifier>,
  contentItemsById: m.ContentItemsById,
): boolean => {
  if (predicate == null) {
    return true;
  }
  else {
    return predicate(contentItem, processedItemIds, contentItemsById);
  }
};

export default validatePredicate;
