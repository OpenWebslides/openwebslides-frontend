// @flow

import DeviceTypeSpy from './DeviceTypeSpy';
import Settings from './Settings';
import UserAccountMenu from './UserAccountMenu';
import UserComment from './UserComment';
import UserProfile from './UserProfile';

const index = {
  DeviceTypeSpy,
  Settings,
  UserAccountMenu,
  UserComment,
  UserProfile,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default index;
