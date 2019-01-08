// @flow

import accept from './accept';
import create from './create';
import fetch from './fetch';
import reject from './reject';

const taskSagaActions = {
  accept,
  create,
  fetch,
  reject,
};

export default taskSagaActions;
