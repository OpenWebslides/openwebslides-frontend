// @flow

import _ from 'lodash';
import createCachedSelector from 're-reselect';

import { type AppState } from 'types/redux';

import lib from '../lib';
import * as m from '../model';

import getById from './getById';
import getAllById from './getAllById';

const canIndent = createCachedSelector(
  [getById, getAllById], (
    contentItem: ?m.ContentItem,
    contentItemsById: m.ContentItemsById,
  ): boolean => {
    const previousSiblingItem = lib.find.previousSiblingItem(contentItem, contentItemsById);

    return (
      contentItem != null
      && previousSiblingItem != null
      && _.includes(m.subableContentItemTypes, previousSiblingItem.type)
    );
  },
)(
  // eslint-disable-next-line react/destructuring-assignment
  (state: AppState, props: { id: string }) => props.id,
);

export default canIndent;
