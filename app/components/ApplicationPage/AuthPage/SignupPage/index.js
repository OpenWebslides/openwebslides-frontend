// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';

import { HOME_ROUTE } from 'config/routes';
import { type ModulesAction } from 'types/redux';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';
import users from 'modules/users';

type DispatchProps = {|
  onSignup: (email: string, name: string, password: string, tosAccepted: boolean) => void,
|};

type Props = {| ...TranslatorProps |};

const { SignupCard } = platform.components;

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    onSignup: (email: string, name: string, password: string, tosAccepted: boolean): void => {
      dispatch(users.actions.signup(email, name, password, tosAccepted));
      dispatch(push(HOME_ROUTE));
    },
  };
};

const PureSignupPage = (props: Props): React.Node => {
  const { onSignup } = props;

  return (
    <ContainerPageWrapper>
      <SignupCard onSignup={onSignup} />
    </ContainerPageWrapper>
  );
};

const SignupPage = connect(null, mapDispatchToProps)(withNamespaces()(PureSignupPage));

export { PureSignupPage };
export default SignupPage;
