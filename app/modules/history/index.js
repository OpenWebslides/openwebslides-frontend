// @flow

import * as actions from './actions';
import * as model from './model';
import * as selectors from './selectors';
import components from './components';
import reducer from './reducer';
import saga from './saga';

import type { HistoryState } from './model';

const History = components.History;

const history = {
  actions,
  components,
  model,
  reducer,
  selectors,
  saga,
};

export { History };
export type { HistoryState };

export default history;
