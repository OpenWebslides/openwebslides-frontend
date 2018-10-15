// @flow

import * as a from '../../actionTypes';

const updateWithContent = (
  id: string,
  title: ?string = null,
  description: ?string = null,
): a.UpdateWithContentAction => {
  return {
    type: a.UPDATE_WITH_CONTENT,
    payload: {
      id,
      title,
      description,
    },
  };
};

export default updateWithContent;
