// @flow

import createCachedSelector from 're-reselect';

import { type State } from 'types/state';

import * as m from '../model';
import find from '../lib/find';

import getById from './getById';
import getAllById from './getAllById';

const getSelfAndAllDescendantsById = createCachedSelector(
  [getById, getAllById], (
    contentItem: ?m.ContentItem,
    contentItemsById: m.ContentItemsById,
  ): $ReadOnlyArray<m.ContentItem> => {
    if (contentItem == null) return [];

    const allDescendantItems = find.allDescendantItems(contentItem, contentItemsById);
    return [
      contentItem,
      ...allDescendantItems,
    ];
  },
)(
  // eslint-disable-next-line react/destructuring-assignment
  (state: State, props: { id: string }) => props.id,
);

export default getSelfAndAllDescendantsById;
