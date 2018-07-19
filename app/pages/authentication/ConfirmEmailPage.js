// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { InvalidArgumentError } from 'errors';
import Page from 'core-components/Page';
import FlashMessages from 'core-components/flash/FlashMessages';
import apiRequestsStatus from 'modules/apiRequestsStatus';
import platform from 'modules/platform';

const { ApiDimmer } = apiRequestsStatus.components;
const { UnauthWrapper } = platform.components;

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
      <UnauthWrapper redirectIfAuthenticated="/">
        <Page>
          <FlashMessages />
          <ApiDimmer requestIds={[platform.actions.apiPostConfirmation('dummy').type]} />
        </Page>
      </UnauthWrapper>
    );
  }
}

const ConfirmEmailPage = translate()(connect(null, mapDispatchToProps)(PureConfirmEmailPage));

export { PureConfirmEmailPage };
export default ConfirmEmailPage;
