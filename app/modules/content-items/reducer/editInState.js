// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import * as t from '../actionTypes';
import {
  plainTextContentItemTypes,
} from '../model';
import type {
  PlainTextContentItem,
  ContentItemsState,
} from '../model';

const editInState = (
  state: ContentItemsState,
  action: t.EditInStateAction,
): ContentItemsState => {
  const { id, type, propsForType } = action.payload;
  const contentItemToEdit = state.byId[id];

  if (contentItemToEdit == null) {
    throw new ObjectNotFoundError('contentItems:contentItem', id);
  }

  if (contentItemToEdit.type !== type) {
    throw new InvalidArgumentError(`The contentItem's type does not match the type passed in the action. The contentItem's type was: "${contentItemToEdit.type}". The type passed in the action was: "${type}".`);
  }

  const editedContentItem: any = { ...contentItemToEdit };

  if (_.includes(plainTextContentItemTypes, type)) {
    if (propsForType.text != null) {
      (editedContentItem: PlainTextContentItem).text = propsForType.text;
    }
  }

  if (_.isEqual(editedContentItem, contentItemToEdit)) {
    return state;
  }
  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: editedContentItem,
      },
    };
  }
};

export default editInState;
