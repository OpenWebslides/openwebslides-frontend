// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const update = (
  id: string,
  title: ?string,
  description: ?string,
  access: ?m.AccessType,
): a.UpdateAction => {
  return {
    type: a.UPDATE,
    payload: {
      id,
      title,
      description,
      access,
    },
  };
};

export default update;
