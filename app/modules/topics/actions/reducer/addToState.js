// @flow

import _ from 'lodash';

import { InvalidArgumentError } from 'errors';

import * as a from '../../actionTypes';

const addToState = (
  id: string,
  userId: string,
  title: string,
  description: ?string = null,
  rootContentItemId: string,
): a.AddToStateAction => {
  const newTitle = _.trim(title);
  const newDescription = (description != null) ? _.trim(description) : '';

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  return {
    type: a.ADD_TO_STATE,
    payload: {
      id,
      userId,
      title: newTitle,
      description: newDescription,
      rootContentItemId,
    },
  };
};

export default addToState;
