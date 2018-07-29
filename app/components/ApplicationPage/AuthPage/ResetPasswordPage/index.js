// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { InvalidArgumentError } from 'errors';
import PageWrapper from 'components/PageWrapper';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

type Props = {| ...TranslatorProps, ...RouterProps |};

const { ApiDimmer } = apiRequestsStatus.components;
const { ResetPasswordCard } = platform.components;

const PureResetPasswordPage = (props: Props): React.Node => {
  const { location } = props;
  const params = new URLSearchParams(location.search);
  const resetPasswordToken = params.get('resetPasswordToken');

  if (!resetPasswordToken) throw new InvalidArgumentError(`Invalid resetPasswordToken`);

  return (
    <PageWrapper>
      <ApiDimmer requestIds={[platform.actions.apiPatchPassword('dummy', 'dummy').type]} />

      <ResetPasswordCard resetPasswordToken={resetPasswordToken} />
    </PageWrapper>
  );
};

const ResetPasswordPage = translate()(PureResetPasswordPage);

export { PureResetPasswordPage };
export default ResetPasswordPage;
