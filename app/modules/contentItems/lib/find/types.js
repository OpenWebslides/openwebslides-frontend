// @flow

import type { Identifier } from 'types/model';

import * as m from '../../model';

export type FindFunctionPredicate = (
  contentItem: m.ContentItem,
  processedItemIds: Array<Identifier>,
  contentItemsById: m.ContentItemsById,
) => boolean;

export type SingleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
) => ?m.ContentItem;

export type MultipleFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
) => Array<m.ContentItem>;

export type RecursiveFindFunction = (
  contentItem: ?m.ContentItem,
  contentItemsById: m.ContentItemsById,
  singleFindFunction: SingleFindFunction,
  predicate?: FindFunctionPredicate,
) => ?m.ContentItem;
