// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import Page from 'core-components/Page';
import FlashMessages from 'core-components/flash/FlashMessages';
import platform from 'modules/platform';

const { ResetPasswordCard } = platform.components;

type Props = TranslatorProps;

const PureResetPasswordPage = (props: Props): React.Node => {
  return (
    <Page>
      <FlashMessages />
      <ResetPasswordCard />
    </Page>
  );
};

const ResetPasswordPage = translate()(PureResetPasswordPage);

export { PureResetPasswordPage };
export default ResetPasswordPage;
