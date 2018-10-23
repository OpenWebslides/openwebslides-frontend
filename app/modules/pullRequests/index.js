// @flow

import actions from './actions';
import components from './components';
import * as model from './model';
import reducer from './reducer';
import selectors from './selectors';
import saga from './saga';

const pullRequests = {
  actions,
  components,
  model,
  reducer,
  saga,
  selectors,
};

export default pullRequests;
