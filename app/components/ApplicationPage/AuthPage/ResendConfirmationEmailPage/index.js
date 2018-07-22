// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import FlashMessages from 'components/FlashMessages';
import platform from 'modules/platform';

const { ResendConfirmationEmailCard } = platform.components;

type Props = TranslatorProps;

const PureResendConfirmationEmailPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <FlashMessages />
      <ResendConfirmationEmailCard />
    </ContainerPageWrapper>
  );
};

const ResendConfirmationEmailPage = translate()(PureResendConfirmationEmailPage);

export { PureResendConfirmationEmailPage };
export default ResendConfirmationEmailPage;
