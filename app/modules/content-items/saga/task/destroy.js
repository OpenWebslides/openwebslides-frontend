// @flow

import * as t from '../../actionTypes';

// eslint-disable-next-line require-yield
const destroySaga = function* (action: t.DestroyAction): Generator<*, *, *> {
  // #TODO
  console.log(`destroySaga called with action ${JSON.stringify(action)}`);
};

export default destroySaga;
