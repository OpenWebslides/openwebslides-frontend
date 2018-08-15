// @flow

import _ from 'lodash';

import { UnsupportedOperationError } from 'errors';
import validate from 'lib/validate';

import * as a from '../../actionTypes';

const editInState = (
  id: string,
  editedProps: $PropertyType<$PropertyType<a.EditInStateAction, 'payload'>, 'editedProps'>,
): a.EditInStateAction => {
  if (_.isEmpty(editedProps)) throw new UnsupportedOperationError(`Attempted to create superfluous action. This is probably a developer error.`);

  const validatedProps = validate.stringProps(['title'], ['description'], editedProps);

  return {
    type: a.EDIT_IN_STATE,
    payload: {
      id,
      editedProps: validatedProps,
    },
  };
};

export default editInState;
