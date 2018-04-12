// @flow

import * as t from '../../actionTypes';

// eslint-disable-next-line require-yield
const createSaga = function* (action: t.CreateAction): Generator<*, *, *> {
  // #TODO
  console.log(`createSaga called with action ${JSON.stringify(action)}`);
};

export default createSaga;
