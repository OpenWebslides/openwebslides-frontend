// @flow

import * as a from '../../actionTypes';

const log = (errorObject: Error): a.LogAction => {
  return {
    type: a.LOG,
    payload: {
      errorObject,
    },
  };
};

export default log;
