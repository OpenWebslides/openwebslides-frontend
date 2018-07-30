// @flow

import * as a from '../../actionTypes';

const apiGetContent = (
  id: string,
): a.ApiGetTopicContentAction => {
  return {
    type: a.API_GET_CONTENT,
    payload: {
      id,
    },
  };
};

export default apiGetContent;
