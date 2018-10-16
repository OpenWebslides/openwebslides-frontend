// @flow

import { ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

const setDirtyInState = (
  state: m.ContentItemsState,
  action: a.SetDirtyInStateAction,
): m.ContentItemsState => {
  const { id, dirty } = action.payload;
  const contentItemToEdit = state.byId[id];
  if (contentItemToEdit == null) throw new ObjectNotFoundError(`contentItems:contentItem`, id);

  if (contentItemToEdit.isDirty === dirty) {
    return state;
  }

  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [id]: { ...contentItemToEdit, isDirty: dirty },
      },
    };
  }
};

export default setDirtyInState;
