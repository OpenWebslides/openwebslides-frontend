// @flow

import type { Identifier } from 'types/model';

import type {
  ContentItem,
  ContentItemsById,
} from '../../model';

export type SimpleFindFunction = (
  contentItem: ?ContentItem,
  contentItemsById: ContentItemsById,
) => ?ContentItem;

export type FindFunctionPredicate = (
  contentItem: ContentItem,
  processedItemIds: Array<Identifier>,
  contentItemsById: ContentItemsById,
) => boolean;
