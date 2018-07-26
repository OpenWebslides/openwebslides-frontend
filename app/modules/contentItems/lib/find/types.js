// @flow

import * as m from '../../model';

export type FindFunctionPredicate = (
  contentItem: m.ContentItem,
  processedItemIds: $ReadOnlyArray<string>,
  contentItemsById: m.ContentItemsById,
) => boolean;

export type SingleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
) => ?m.ContentItem;

export type MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
) => $ReadOnlyArray<m.ContentItem>;

export type RecursiveFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
  singleFindFunction: SingleFindFunction,
  predicate?: FindFunctionPredicate,
) => ?m.ContentItem;
