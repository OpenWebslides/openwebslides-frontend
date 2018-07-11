// @flow
/* eslint-disable flowtype/no-weak-types */

import _ from 'lodash';

import CorruptedInternalStateError from 'errors/implementation-errors/CorruptedInternalStateError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import * as t from '../actionTypes';
import * as m from '../model';

const editPropsForTypeInState = (
  state: m.ContentItemsState,
  action: t.EditPropsForTypeInStateAction,
): m.ContentItemsState => {
  const { contentItem, propsForType } = action.payload;
  const contentItemToEdit = state.byId[contentItem.id];
  if (contentItemToEdit == null) throw new ObjectNotFoundError('contentItems:contentItem', contentItem.id);
  if (!_.isEqual(contentItem, contentItemToEdit)) throw new CorruptedInternalStateError(`The contentItem passed in the action does not match the contentItem with the same id fetched from the state. Either the contentItem passed in the action has not been refreshed after a previous edit action, or a developer has attempted to edit a contentItem without using a reducer.`);

  const editedContentItem: any = { ...contentItemToEdit };

  if (_.includes(m.plainTextContentItemTypes, contentItemToEdit.type)) {
    if (propsForType.text != null) {
      (editedContentItem: m.PlainTextContentItem).text = propsForType.text;
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
        [editedContentItem.id]: editedContentItem,
      },
    };
  }
};

export default editPropsForTypeInState;
