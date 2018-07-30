// @flow

import * as a from '../../actionTypes';

const save = (
  id: string,
): a.SaveContentAction => {
  return {
    type: a.SAVE,
    payload: {
      id,
    },
  };
};

export default save;
