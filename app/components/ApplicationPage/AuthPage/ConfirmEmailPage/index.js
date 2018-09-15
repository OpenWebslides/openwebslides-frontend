// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { type ContextRouter as RouterProps } from 'react-router-dom';

import { type ModulesAction } from 'types/redux';
import { InvalidArgumentError } from 'errors';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';

type DispatchProps = {|
  confirmEmail: (confirmationToken: string) => void,
|};

type Props = {| ...TranslatorProps, ...RouterProps, ...DispatchProps |};

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
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

  // #TODO should anything be displayed here at all or is ApiDimmer sufficient?
  render(): React.Node {
    return (
      <ContainerPageWrapper>
        <p>You will be redirected soon.</p>
      </ContainerPageWrapper>
    );
  }
}

const ConfirmEmailPage = translate()(connect(null, mapDispatchToProps)(PureConfirmEmailPage));

export { PureConfirmEmailPage };
export default ConfirmEmailPage;
