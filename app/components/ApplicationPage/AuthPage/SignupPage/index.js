// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

type Props = {| ...TranslatorProps |};

const { SignupCard } = platform.components;

const PureSignupPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <SignupCard />
    </ContainerPageWrapper>
  );
};

const SignupPage = translate()(PureSignupPage);

export { PureSignupPage };
export default SignupPage;
