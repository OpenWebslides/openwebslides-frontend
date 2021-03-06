// @flow

import actions from './actions';
import * as actionTypes from './actionTypes';
import components from './components';
import * as model from './model';
import reducer from './reducer';
import saga from './saga';
import selectors from './selectors';

const topics = {
  actions,
  actionTypes,
  components,
  model,
  reducer,
  saga,
  selectors,
};

export default topics;
