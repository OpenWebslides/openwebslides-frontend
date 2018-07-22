// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { InvalidArgumentError } from 'errors';
import PageWrapper from 'components/PageWrapper';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

const { ApiDimmer } = apiRequestsStatus.components;

type DispatchProps = {|
  confirmEmail: (confirmationToken: string) => void,
|};

type Props = {| ...TranslatorProps, ...RouterProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    confirmEmail: (confirmationToken: string): void => {
      dispatch(platform.actions.confirmEmail(confirmationToken));
    },
  };
};

class PureConfirmEmailPage extends React.Component<Props> {
  componentDidMount(): void {
    const { match, confirmEmail } = this.props;
    if (match.params.confirmationToken == null) throw new InvalidArgumentError(`This shouldn't happen.`);
    confirmEmail(match.params.confirmationToken);
  }

  render(): React.Node {
    return (
      <PageWrapper>
        <ApiDimmer requestIds={[platform.actions.apiPostConfirmation('dummy').type]} />
      </PageWrapper>
    );
  }
}

const ConfirmEmailPage = translate()(connect(null, mapDispatchToProps)(PureConfirmEmailPage));

export { PureConfirmEmailPage };
export default ConfirmEmailPage;
