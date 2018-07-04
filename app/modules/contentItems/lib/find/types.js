// @flow

import type { Identifier } from 'types/model';

import * as model from '../../model';

const { ContentItem, ContentItemsById } = model;

export type FindFunctionPredicate = (
  contentItem: ContentItem,
  processedItemIds: Array<Identifier>,
  contentItemsById: ContentItemsById,
) => boolean;

export type SingleFindFunction = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
) => ?ContentItem;

export type MultipleFindFunction = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
) => Array<ContentItem>;

export type RecursiveFindFunction = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
  singleFindFunction: SingleFindFunction,
  predicate?: FindFunctionPredicate,
) => ?ContentItem;
