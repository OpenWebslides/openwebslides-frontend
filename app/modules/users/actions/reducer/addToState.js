// @flow

import * as a from '../../actionTypes';

const addToState = (
  id: string,
  email: ?string,
  name: string,
): a.AddToStateAction => {
  return {
    type: a.ADD_TO_STATE,
    payload: {
      id,
      email: (email != null && email !== '') ? email : null,
      name,
    },
  };
};

export default addToState;
