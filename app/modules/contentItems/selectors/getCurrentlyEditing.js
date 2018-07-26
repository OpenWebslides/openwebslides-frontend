// @flow

import _ from 'lodash';
import { createSelector } from 'reselect';

import * as m from '../model';

import getAllById from './getAllById';

const getCurrentlyEditing = createSelector(
  [getAllById],
  (contentItemsById: m.ContentItemsById): ?m.ContentItem => {
    const currentlyEditingItem = _.find(
      // $FlowFixMe See https://github.com/flow-typed/flow-typed/issues/1099
      contentItemsById,
      (contentItem: m.ContentItem): boolean => {
        return contentItem.isEditing;
      },
    );
    return currentlyEditingItem || null;
  },
);

export default getCurrentlyEditing;
