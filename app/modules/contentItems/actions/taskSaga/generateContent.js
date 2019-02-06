// @flow

import * as a from '../../actionTypes';

const generateContent = (rootContentItemId: string): a.GenerateContentAction => {
  return {
    type: a.GENERATE_CONTENT,
    payload: {
      rootContentItemId,
    },
  };
};

export default generateContent;
