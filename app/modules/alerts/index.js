// @flow

import actions from './actions';
import * as actionTypes from './actionTypes';
import components from './components';
import * as model from './model';
import reducer from './reducer';
import selectors from './selectors';
import saga from './saga';

const feedItems = {
  actions,
  actionTypes,
  components,
  model,
  reducer,
  saga,
  selectors,
};

export default feedItems;
