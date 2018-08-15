// @flow

import * as a from '../../actionTypes';

const fetchWithContent = (id: string): a.FetchWithContentAction => {
  return {
    type: a.FETCH_WITH_CONTENT,
    payload: {
      id,
    },
  };
};

export default fetchWithContent;
