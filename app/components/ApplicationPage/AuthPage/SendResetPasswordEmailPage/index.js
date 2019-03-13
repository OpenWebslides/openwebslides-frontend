// @flow

import * as React from 'react';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

type Props = {| |};

const { SendResetPasswordEmailCard } = platform.components;

const PureSendResetPasswordEmailPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <SendResetPasswordEmailCard />
    </ContainerPageWrapper>
  );
};

const SendResetPasswordEmailPage = PureSendResetPasswordEmailPage;

export { PureSendResetPasswordEmailPage };
export default SendResetPasswordEmailPage;
