// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';

import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

const { ResetPasswordCard } = platform.components;

type Props = TranslatorProps;

const PureResetPasswordPage = (props: Props): React.Node => {
  return (
    <ContainerPageWrapper>
      <ResetPasswordCard />
    </ContainerPageWrapper>
  );
};

const ResetPasswordPage = translate()(PureResetPasswordPage);

export { PureResetPasswordPage };
export default ResetPasswordPage;
