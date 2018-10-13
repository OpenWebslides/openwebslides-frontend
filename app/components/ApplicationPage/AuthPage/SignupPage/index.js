// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';

import { type ModulesAction } from 'types/redux';
import ContainerPageWrapper from 'components/ContainerPageWrapper';
import platform from 'modules/platform';
import users from 'modules/users';

type DispatchProps = {|
  onCreateUser: (email: string, name: string, password: string, tosAccepted: boolean) => void,
|};

type Props = {| ...TranslatorProps |};

const { SignupCard } = platform.components;

const mapDispatchToProps = (dispatch: Dispatch<ModulesAction>): DispatchProps => {
  return {
    onCreateUser: (email: string, name: string, password: string, tosAccepted: boolean): void => {
      dispatch(users.actions.create(email, name, password, tosAccepted));
    },
  };
};

const PureSignupPage = (props: Props): React.Node => {
  const { onCreateUser } = props;

  return (
    <ContainerPageWrapper>
      <SignupCard onCreateUser={onCreateUser} />
    </ContainerPageWrapper>
  );
};

const SignupPage = connect(null, mapDispatchToProps)(withNamespaces()(PureSignupPage));

export { PureSignupPage };
export default SignupPage;
