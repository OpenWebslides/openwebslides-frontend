// @flow

import reducerActions from './reducer';
import apiSagaActions from './apiSaga';
import taskSagaActions from './taskSaga';

const actions = {
  ...reducerActions,
  ...apiSagaActions,
  ...taskSagaActions,
};

export default actions;
