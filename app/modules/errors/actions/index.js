// @flow

import reducerActions from './reducer';
import taskSagaActions from './taskSaga';

const actions = {
  ...reducerActions,
  ...taskSagaActions,
};

export default actions;
