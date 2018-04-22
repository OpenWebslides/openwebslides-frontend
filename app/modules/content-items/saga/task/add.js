// @flow

import * as t from '../../actionTypes';

// eslint-disable-next-line require-yield
const addSaga = function* (action: t.AddAction): Generator<*, *, *> {
  // #TODO
  console.log(`addSaga called with action ${JSON.stringify(action)}`);
};

export default addSaga;
