// @flow

import createCachedSelector from 're-reselect';

import { type AppState } from 'types/redux';

import lib from '../lib';
import * as m from '../model';

import getById from './getById';
import getAllById from './getAllById';

const canUnindent = createCachedSelector(
  [getById, getAllById], (
    contentItem: ?m.ContentItem,
    contentItemsById: m.ContentItemsById,
  ): boolean => {
    const parentOrSuperItem = lib.find.superItem(
      contentItem,
      contentItemsById,
    );
    const parentOrSuperContext = (parentOrSuperItem != null)
      ? lib.find.extendedSuperContext(parentOrSuperItem, contentItemsById)
      : null;

    return (
      contentItem != null
      && parentOrSuperItem != null
      && parentOrSuperContext != null
      && (
        contentItem.type === m.contentItemTypes.HEADING
        || parentOrSuperItem.type !== m.contentItemTypes.HEADING
      )
    );
  },
)(
  // eslint-disable-next-line react/destructuring-assignment
  (state: AppState, props: { id: string }) => props.id,
);

export default canUnindent;
