// @flow

import _ from 'lodash';

import { ObjectNotFoundError } from 'errors';

import * as a from '../actionTypes';
import * as m from '../model';

const editTopicIdsInState = (
  state: m.UsersState,
  action: a.EditTopicIdsInStateAction,
): m.UsersState => {
  const { id, topicIds } = action.payload;
  const userToEdit = state.byId[id];
  if (userToEdit == null) throw new ObjectNotFoundError(`users:user`, id);

  if (_.isEqual(userToEdit.topicIds, topicIds)) {
    return state;
  }
  else {
    return {
      ...state,
      byId: {
        ...state.byId,
        [userToEdit.id]: {
          ...userToEdit,
          topicIds,
        },
      },
    };
  }
};

export default editTopicIdsInState;
