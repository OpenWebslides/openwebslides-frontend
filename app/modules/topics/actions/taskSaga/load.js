// @flow

import * as a from '../../actionTypes';

const load = (
  id: string,
): a.LoadContentAction => {
  return {
    type: a.LOAD,
    payload: {
      id,
    },
  };
};

export default load;
