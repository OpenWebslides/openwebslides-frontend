// @flow

import * as a from '../../actionTypes';

const addToState = (
  id: string,
  email: ?string,
  firstName: string,
  lastName: ?string,
): a.AddToStateAction => {
  return {
    type: a.ADD_TO_STATE,
    payload: {
      id,
      email: (email != null && email !== '') ? email : null,
      firstName,
      lastName: (lastName != null && lastName !== '') ? lastName : null,
    },
  };
};

export default addToState;
