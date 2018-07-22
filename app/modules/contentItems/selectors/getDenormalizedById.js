// @flow
import createCachedSelector from 're-reselect';

import type { State } from 'types/state';

import denormalize from '../lib/denormalize';
import type {
  ContentItem,
  DenormalizedContentItem,
  ContentItemsById,
} from '../model';

import getById from './getById';
import getAllById from './getAllById';

const getDenormalizedById = createCachedSelector(
  [getById, getAllById],
  (contentItem: ?ContentItem, contentItemsById: ContentItemsById): ?DenormalizedContentItem => {
    return denormalize(contentItem, contentItemsById);
  },
)(
  // eslint-disable-next-line react/destructuring-assignment
  (state: State, props: { id: string }) => props.id,
);

export default getDenormalizedById;
