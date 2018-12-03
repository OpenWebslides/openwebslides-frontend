// @flow

import Settings from './Settings';
import UserAccountMenu from './UserAccountMenu';
import UserProfile from './UserProfile';

const index = {
  Settings,
  UserAccountMenu,
  UserProfile,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default index;
