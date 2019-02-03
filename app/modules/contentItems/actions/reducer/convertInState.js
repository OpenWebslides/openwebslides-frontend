// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const convertInState = (id: string, newType: m.ContentItemType): a.ConvertInStateAction => {
  return {
    type: a.CONVERT_IN_STATE,
    payload: {
      id,
      newType,
    },
  };
};

export default convertInState;
