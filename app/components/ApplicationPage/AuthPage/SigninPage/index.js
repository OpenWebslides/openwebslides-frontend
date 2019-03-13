// @flow

import * as React from 'react';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

type Props = {| |};

const { SigninCard } = platform.components;

const PureSigninPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <SigninCard />
    </ContainerPageWrapper>
  );
};

const SigninPage = PureSigninPage;

export { PureSigninPage };
export default SigninPage;
