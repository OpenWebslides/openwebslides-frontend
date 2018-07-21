// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import Page from 'core-components/Page';
import FlashMessages from 'core-components/flash/FlashMessages';
import platform from 'modules/platform';

const { UnauthWrapper, SigninCard } = platform.components;

type Props = TranslatorProps;

const PureSigninPage = (props: Props): React.Node => {
  return (
    <UnauthWrapper redirectIfAuthenticated="/">
      <Page>
        <FlashMessages />
        <SigninCard />
      </Page>
    </UnauthWrapper>
  );
};

const SigninPage = translate()(PureSigninPage);

export { PureSigninPage };
export default SigninPage;
