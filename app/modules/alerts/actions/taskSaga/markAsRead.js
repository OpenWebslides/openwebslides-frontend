// @flow

import * as a from '../../actionTypes';

const markAsRead = (id: string): a.MarkAsReadAction => {
  return {
    type: a.MARK_AS_READ,
    payload: {
      id,
    },
  };
};

export default markAsRead;
