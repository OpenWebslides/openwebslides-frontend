// @flow

import IncomingPullRequest from './IncomingPullRequest';
import OutgoingPullRequest from './OutgoingPullRequest';

const index = {
  IncomingPullRequest,
  OutgoingPullRequest,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default index;
