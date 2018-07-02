// @flow

import createCachedSelector from 're-reselect';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { ContentItem, ContentItemsById } from '../model';
import find from '../lib/find';
import getById from './getById';
import getAllById from './getAllById';

const getSelfAndAllDescendantsById = createCachedSelector(
  [getById, getAllById],
  (contentItem: ?ContentItem, contentItemsById: ContentItemsById): Array<ContentItem> => {
    if (contentItem == null) return [];

    const allDescendantItems = find.allDescendantItems(contentItem, contentItemsById);
    return [
      contentItem,
      ...allDescendantItems,
    ];
  },
)(
  (state: State, props: { id: Identifier }) => props.id,
);

export default getSelfAndAllDescendantsById;
