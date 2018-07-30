// @flow

import _ from 'lodash';

import { InvalidArgumentError } from 'errors';

import * as a from '../../actionTypes';
import generateId from '../../lib/generateId';

const add = (
  userId: string,
  title: string,
  description: ?string = null,
): a.AddAction => {
  const newId = generateId();
  const newTitle = _.trim(title);
  const newDescription = (description != null) ? _.trim(description) : '';

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  return {
    type: a.ADD,
    payload: {
      id: newId,
      userId,
      title: newTitle,
      description: newDescription,
      rootContentItemId: 'w4lg2u0p1h', // #TODO stub
    },
  };
};

export default add;
