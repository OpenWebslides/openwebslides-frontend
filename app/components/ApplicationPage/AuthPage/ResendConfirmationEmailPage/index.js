// @flow

import * as React from 'react';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

type Props = {| |};

const { ResendConfirmationEmailCard } = platform.components;

const PureResendConfirmationEmailPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <ResendConfirmationEmailCard />
    </ContainerPageWrapper>
  );
};

const ResendConfirmationEmailPage = PureResendConfirmationEmailPage;

export { PureResendConfirmationEmailPage };
export default ResendConfirmationEmailPage;
