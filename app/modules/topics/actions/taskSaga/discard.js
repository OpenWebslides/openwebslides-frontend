// @flow

import * as a from '../../actionTypes';

const discard = (id: string): a.DiscardAction => {
  return {
    type: a.DISCARD,
    payload: {
      id,
    },
  };
};

export default discard;
