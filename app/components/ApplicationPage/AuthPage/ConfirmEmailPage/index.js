// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { type ContextRouter as RouterProps } from 'react-router-dom';
import { push } from 'connected-react-router';

import { HOME_ROUTE } from 'config/routes';
import { type ModulesAction } from 'types/redux';
import { InvalidArgumentError } from 'errors';
import platform from 'modules/platform';

type DispatchProps = {|
  confirmEmailAndRedirect: (confirmationToken: string) => void,
|};

type Props = {| ...TranslatorProps, ...RouterProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    confirmEmailAndRedirect: (confirmationToken: string): void => {
      dispatch(platform.actions.confirmEmail(confirmationToken));
      dispatch(push(HOME_ROUTE));
    },
  };
};

class PureConfirmEmailPage extends React.Component<Props> {
  componentDidMount(): void {
    const { location, confirmEmailAndRedirect } = this.props;
    const params = new URLSearchParams(location.search);
    const confirmationToken = params.get('confirmationToken');

    if (confirmationToken == null) throw new InvalidArgumentError(`Invalid confirmationToken`);

    confirmEmailAndRedirect(confirmationToken);
  }

  render(): React.Node {
    return null;
  }
}

const ConfirmEmailPage = withNamespaces()(connect(null, mapDispatchToProps)(PureConfirmEmailPage));

export { PureConfirmEmailPage };
export default ConfirmEmailPage;
