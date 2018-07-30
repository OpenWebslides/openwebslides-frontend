// @flow

import _ from 'lodash';

import { InvalidArgumentError, UnsupportedOperationError } from 'errors';

import * as a from '../../actionTypes';

const editInState = (
  id: string,
  title: ?string = null,
  description: ?string = null,
): a.EditInStateAction => {
  const newTitle = (title != null) ? _.trim(title) : null;
  const newDescription = (description != null) ? _.trim(description) : null;

  if (newTitle === '') {
    throw new InvalidArgumentError(`"title" prop cannot be an empty string`);
  }

  if (newTitle === null && newDescription === null) {
    throw new UnsupportedOperationError(`Action must contain at least one edit`);
  }

  return {
    type: a.EDIT_IN_STATE,
    payload: {
      id,
      title: newTitle,
      description: newDescription,
    },
  };
};

export default editInState;
