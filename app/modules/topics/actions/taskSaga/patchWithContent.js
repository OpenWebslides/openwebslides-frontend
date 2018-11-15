// @flow

import * as a from '../../actionTypes';

const patchWithContent = (
  id: string,
  message: string,
): a.PatchWithContentAction => {
  return {
    type: a.PATCH_WITH_CONTENT,
    payload: {
      id,
      message,
    },
  };
};

export default patchWithContent;
