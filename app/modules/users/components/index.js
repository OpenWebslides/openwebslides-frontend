// @flow

import UserProfile from './UserProfile';
import UserAccountMenu from './UserAccountMenu';

const index = {
  UserProfile,
  UserAccountMenu,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default index;
