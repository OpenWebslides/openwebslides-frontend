// @flow

import * as a from '../../actionTypes';

const update = (
  id: string,
  title?: string,
  description?: ?string,
): a.UpdateAction => {
  return {
    type: a.UPDATE,
    payload: {
      id,
      title,
      description,
    },
  };
};

export default update;
