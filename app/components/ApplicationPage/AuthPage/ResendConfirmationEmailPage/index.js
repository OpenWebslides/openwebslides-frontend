// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import Page from 'core-components/Page';
import FlashMessages from 'core-components/flash/FlashMessages';
import platform from 'modules/platform';

const { ResendConfirmationEmailCard } = platform.components;

type Props = TranslatorProps;

const PureResendConfirmationEmailPage = (props: Props): React.Node => {
  return (
    <Page>
      <FlashMessages />
      <ResendConfirmationEmailCard />
    </Page>
  );
};

const ResendConfirmationEmailPage = translate()(PureResendConfirmationEmailPage);

export { PureResendConfirmationEmailPage };
export default ResendConfirmationEmailPage;
