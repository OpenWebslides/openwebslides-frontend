// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import FlashMessages from 'components/FlashMessages';
import platform from 'modules/platform';

const { ResetPasswordCard } = platform.components;

type Props = TranslatorProps;

const PureResetPasswordPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <FlashMessages />
      <ResetPasswordCard />
    </ContainerPageWrapper>
  );
};

const ResetPasswordPage = translate()(PureResetPasswordPage);

export { PureResetPasswordPage };
export default ResetPasswordPage;
