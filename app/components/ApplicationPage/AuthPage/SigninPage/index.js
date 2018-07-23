// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

const { SigninCard } = platform.components;

type Props = TranslatorProps;

const PureSigninPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <SigninCard />
    </ContainerPageWrapper>
  );
};

const SigninPage = translate()(PureSigninPage);

export { PureSigninPage };
export default SigninPage;
