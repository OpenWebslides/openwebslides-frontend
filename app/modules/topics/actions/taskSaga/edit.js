// @flow

import * as a from '../../actionTypes';

const edit = (
  id: string,
  editedProps: $PropertyType<$PropertyType<a.EditAction, 'payload'>, 'editedProps'>,
): a.EditAction => {
  return {
    type: a.EDIT,
    payload: {
      id,
      editedProps,
    },
  };
};

export default edit;
