// @flow

import * as a from '../../actionTypes';

const update = (
  id: string,
  updatedProps: $PropertyType<$PropertyType<a.UpdateAction, 'payload'>, 'updatedProps'>,
): a.UpdateAction => {
  return {
    type: a.UPDATE,
    payload: {
      id,
      updatedProps,
    },
  };
};

export default update;
