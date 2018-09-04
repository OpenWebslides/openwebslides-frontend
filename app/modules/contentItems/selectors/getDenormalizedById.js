// @flow

import createCachedSelector from 're-reselect';

import { type State } from 'types/state';

import denormalize from '../lib/denormalize';
import * as m from '../model';

import getById from './getById';
import getAllById from './getAllById';

// $FlowFixMe pretty sure this is an issue with the re-reselect libdef rather than our code
const getDenormalizedById = createCachedSelector(
  [getById, getAllById], (
    contentItem: ?m.ContentItem,
    contentItemsById: m.ContentItemsById,
  ): ?m.DenormalizedContentItem => {
    return denormalize(contentItem, contentItemsById);
  },
)(
  // eslint-disable-next-line react/destructuring-assignment
  (state: State, props: { id: string }) => props.id,
);

export default getDenormalizedById;
