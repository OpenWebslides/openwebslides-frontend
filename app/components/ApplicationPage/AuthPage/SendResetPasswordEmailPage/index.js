// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

type Props = {| ...TranslatorProps |};

const { SendResetPasswordEmailCard } = platform.components;

const PureSendResetPasswordEmailPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <SendResetPasswordEmailCard />
    </ContainerPageWrapper>
  );
};

const SendResetPasswordEmailPage = withNamespaces()(PureSendResetPasswordEmailPage);

export { PureSendResetPasswordEmailPage };
export default SendResetPasswordEmailPage;
