// @flow

import * as t from '../../actionTypes';

// eslint-disable-next-line require-yield
const moveSaga = function* (action: t.MoveAction): Generator<*, *, *> {
  // #TODO
  console.log(`moveSaga called with action ${JSON.stringify(action)}`);
};

export default moveSaga;
