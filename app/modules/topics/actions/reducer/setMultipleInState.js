// @flow

import { UnsupportedOperationError } from 'errors';

import * as m from '../../model';
import * as a from '../../actionTypes';

const setMultipleInState = (
  topics: $ReadOnlyArray<m.Topic>,
): a.SetMultipleInStateAction => {
  if (topics.length === 0) throw new UnsupportedOperationError(`Attempted to create a superfluous action. This is probably a developer error.`);

  return {
    type: a.SET_MULTIPLE_IN_STATE,
    payload: {
      topics,
    },
  };
};

export default setMultipleInState;
