// @flow

import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { USER_PROFILE_ROUTE } from 'config/routes';

type Props = {| |};

const PureHomePage = (props: Props): React.Node => {
  return (
    <Redirect to={USER_PROFILE_ROUTE} />
  );
};

const HomePage = PureHomePage;

export { PureHomePage };
export default HomePage;
