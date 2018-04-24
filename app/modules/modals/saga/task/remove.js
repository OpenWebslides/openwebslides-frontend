// @flow

import * as t from '../../actionTypes';

// eslint-disable-next-line require-yield
const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  console.log(`removeSaga called with action ${JSON.stringify(action)}`);
};

export default removeSaga;
