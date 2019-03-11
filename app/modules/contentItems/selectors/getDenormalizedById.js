// @flow

import createCachedSelector from 're-reselect';

import { type AppState } from 'types/redux';

import lib from '../lib';
import * as m from '../model';

import getById from './getById';
import getAllById from './getAllById';

const getDenormalizedById = createCachedSelector(
  [getById, getAllById], (
    contentItem: ?m.ContentItem,
    contentItemsById: m.ContentItemsById,
  ): ?m.DenormalizedContentItem => {
    return lib.denormalize(contentItem, contentItemsById);
  },
)(
  // eslint-disable-next-line react/destructuring-assignment
  (state: AppState, props: { id: string }) => props.id,
);

export default getDenormalizedById;
