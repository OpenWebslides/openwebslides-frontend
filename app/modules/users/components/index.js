// @flow

import ProfileCard from './ProfileCard';
import UserAccountMenu from './UserAccountMenu';

const index = {
  ProfileCard,
  UserAccountMenu,
};

/* istanbul ignore next */
// $FlowFixMe Necessary to make hot loading work for components through index files
if (module.hot) module.hot.accept();

export default index;
