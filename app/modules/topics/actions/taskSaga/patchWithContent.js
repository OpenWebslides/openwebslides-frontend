// @flow

import * as a from '../../actionTypes';

const patchWithContent = (id: string): a.PatchWithContentAction => {
  return {
    type: a.PATCH_WITH_CONTENT,
    payload: {
      id,
    },
  };
};

export default patchWithContent;
