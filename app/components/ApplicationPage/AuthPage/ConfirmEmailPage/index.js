// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { type Action } from 'types/action';
import { InvalidArgumentError } from 'errors';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

type DispatchProps = {|
  confirmEmail: (confirmationToken: string) => void,
|};

type Props = {| ...TranslatorProps, ...RouterProps, ...DispatchProps |};

const { ApiDimmer } = apiRequestsStatus.components;

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    confirmEmail: (confirmationToken: string): void => {
      dispatch(platform.actions.confirmEmail(confirmationToken));
    },
  };
};

class PureConfirmEmailPage extends React.Component<Props> {
  componentDidMount(): void {
    const { location, confirmEmail } = this.props;
    const params = new URLSearchParams(location.search);
    const confirmationToken = params.get('confirmationToken');

    if (confirmationToken == null) throw new InvalidArgumentError(`Invalid confirmationToken`);

    confirmEmail(confirmationToken);
  }

  render(): React.Node {
    return (
      <ContainerPageWrapper>
        <ApiDimmer requestIds={[platform.actions.apiPostConfirmation('dummy').type]} />
      </ContainerPageWrapper>
    );
  }
}

const ConfirmEmailPage = translate()(connect(null, mapDispatchToProps)(PureConfirmEmailPage));

export { PureConfirmEmailPage };
export default ConfirmEmailPage;
