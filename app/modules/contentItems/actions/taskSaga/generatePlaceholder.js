// @flow

import * as a from '../../actionTypes';

const generatePlaceholder = (rootContentItemId: string): a.GeneratePlaceholderAction => {
  return {
    type: a.GENERATE_PLACEHOLDER,
    payload: {
      rootContentItemId,
    },
  };
};

export default generatePlaceholder;
