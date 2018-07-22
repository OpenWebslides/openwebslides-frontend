// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import Page from 'core-components/Page';
import FlashMessages from 'core-components/flash/FlashMessages';
import platform from 'modules/platform';

const { SignupCard } = platform.components;

type Props = TranslatorProps;

const PureSignupPage = (props: Props): React.Node => {
  return (
    <Page>
      <FlashMessages />
      <SignupCard />
    </Page>
  );
};

const SignupPage = translate()(PureSignupPage);

export { PureSignupPage };
export default SignupPage;
