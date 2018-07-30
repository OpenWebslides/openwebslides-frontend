// @flow

import * as a from '../../actionTypes';

const apiPatchContent = (
  id: string,
  // eslint-disable-next-line flowtype/no-weak-types
  content: $ReadOnlyArray<any>,
): a.ApiPatchTopicContentAction => {
  return {
    type: a.API_PATCH_CONTENT,
    payload: {
      id,
      content,
    },
  };
};

export default apiPatchContent;
