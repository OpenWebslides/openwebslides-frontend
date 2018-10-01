// @flow

import setFailure from './setFailure';
import setPending from './setPending';
import setSuccess from './setSuccess';

const taskSagaActions = {
  setFailure,
  setPending,
  setSuccess,
};

export default taskSagaActions;
