// @flow

import * as a from '../../actionTypes';

const accept = (
  id: string,
  feedback: ?string,
): a.AcceptAction => {
  return {
    type: a.ACCEPT,
    payload: {
      id,
      feedback,
    },
  };
};

export default accept;
