// @flow

import * as actions from './actions';
import * as components from './components';
import * as model from './model';
import * as selectors from './selectors';
import reducer from './reducer';

const topics = {
  actions,
  components,
  model,
  reducer,
  selectors,
};

export type TopicsState = {
  +[topicId: string]: model.Topic,
};

export default topics;
