// @flow

import * as React from 'react';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { InvalidArgumentError } from 'errors';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

type Props = {| ...RouterProps |};

const { ResetPasswordCard } = platform.components;

const PureResetPasswordPage = (props: Props): React.Node => {
  const { location } = props;
  const params = new URLSearchParams(location.search);
  const resetPasswordToken = params.get('resetPasswordToken');

  if (resetPasswordToken == null) throw new InvalidArgumentError(`Invalid resetPasswordToken`);

  return (
    <ContainerPageWrapper>
      <ResetPasswordCard resetPasswordToken={resetPasswordToken} />
    </ContainerPageWrapper>
  );
};

const ResetPasswordPage = PureResetPasswordPage;

export { PureResetPasswordPage };
export default ResetPasswordPage;
