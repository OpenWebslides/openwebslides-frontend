// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
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
  const { id, type, props } = action.payload;
  const contentItemToEdit = state.byId[id];

  if (contentItemToEdit == null) {
    throw new Error(`ContentItem with id "${id}" could not be found.`);
  }

  if (contentItemToEdit.type !== type) {
    throw new Error(`The contentItem's type does not match the type passed in the action. The contentItem's type was: "${contentItemToEdit.type}". The type passed in the action was: "${type}".`);
  }

  const editedContentItem: any = { ...contentItemToEdit };

  if (_.includes(plainTextContentItemTypes, type)) {
    if (props.text != null) (editedContentItem: PlainTextContentItem).text = props.text;
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
