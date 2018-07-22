// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import FlashMessages from 'components/FlashMessages';
import platform from 'modules/platform';

const { SignupCard } = platform.components;

type Props = TranslatorProps;

const PureSignupPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <FlashMessages />
      <SignupCard />
    </ContainerPageWrapper>
  );
};

const SignupPage = translate()(PureSignupPage);

export { PureSignupPage };
export default SignupPage;
