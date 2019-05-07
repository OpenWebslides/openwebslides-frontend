// @flow

import * as a from '../../actionTypes';
import * as m from '../../model';

const selectInState = (
  selection: m.SelectionType,
): a.SelectInStateAction => {
  return {
    type: a.SELECT_IN_STATE,
    payload: {
      selection,
    },
  };
};

export default selectInState;
