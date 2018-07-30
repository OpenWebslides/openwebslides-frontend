// @flow

import * as m from '../../model';
import * as a from '../../actionTypes';

const setItemsInState = (
  items: $ReadOnlyArray<m.Topic>,
): a.SetItemsInStateAction => {
  return {
    type: a.SET_ITEMS_IN_STATE,
    payload: {
      items,
    },
  };
};

export default setItemsInState;
