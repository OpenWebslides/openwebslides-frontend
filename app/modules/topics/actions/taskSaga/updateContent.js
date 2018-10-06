// @flow

import * as a from '../../actionTypes';

const updateContent = (id: string): a.UpdateContentAction => {
  return {
    type: a.UPDATE_CONTENT,
    payload: {
      id,
    },
  };
};

export default updateContent;
