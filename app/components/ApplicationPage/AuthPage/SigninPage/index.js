// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

type Props = {| ...TranslatorProps |};

const { SigninCard } = platform.components;

const PureSigninPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <SigninCard />
    </ContainerPageWrapper>
  );
};

const SigninPage = withNamespaces()(PureSigninPage);

export { PureSigninPage };
export default SigninPage;
