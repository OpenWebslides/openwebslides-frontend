// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

type Props = {| ...TranslatorProps |};

const { ResendConfirmationEmailCard } = platform.components;

const PureResendConfirmationEmailPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <ResendConfirmationEmailCard />
    </ContainerPageWrapper>
  );
};

const ResendConfirmationEmailPage = translate()(PureResendConfirmationEmailPage);

export { PureResendConfirmationEmailPage };
export default ResendConfirmationEmailPage;
