// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';
import * as t from '../actionTypes';
import {
  plainTextContentItemTypes,
} from '../model';
import type {
  PlainTextContentItem,
  ContentItemsState,
} from '../model';

const editPropsForTypeInState = (
  state: ContentItemsState,
  action: t.EditPropsForTypeInStateAction,
): ContentItemsState => {
  const { id, type, isEditing, propsForType } = action.payload;
  const contentItemToEdit = state.byId[id];
  if (contentItemToEdit == null) throw new ObjectNotFoundError('contentItems:contentItem', id);
  if (contentItemToEdit.type !== type) throw new InvalidArgumentError(`The contentItem's type does not match the type passed in the action. The contentItem's type was: "${contentItemToEdit.type}". The type passed in the action was: "${type}".`);
  if (contentItemToEdit.isEditing !== isEditing) throw new InvalidArgumentError(`The contentItem's isEditing value does not match the isEditing value passed in the action. The contentItem's value was: "${String(contentItemToEdit.isEditing)}". The value passed in the action was: "${String(isEditing)}".`);

  const editedContentItem: any = { ...contentItemToEdit };

  if (_.includes(plainTextContentItemTypes, type)) {
    if (propsForType.text != null) {
      (editedContentItem: PlainTextContentItem).text = propsForType.text;
    }
  }
  else {
    throw new NotYetImplementedError(`ContentItem type not supported yet.`);
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

export default editPropsForTypeInState;
