// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import type { State } from 'types/state';

import authentication from 'modules/authentication';

import Page from './Page';

const { isAuthenticated } = authentication.selectors;

type StateProps = {
  authenticated: boolean,
};

type PassedProps = {
  children: React.Node,
};

type Props = PassedProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  return {
    authenticated: isAuthenticated(state),
  };
};


const PureAuthenticatedPage = (props: Props): React.Node => {
  const {
    authenticated,
  } = props;

  if (!authenticated) {
    return <Redirect to="/auth/signin" />;
  }

  return (
    <Page>
      {props.children}
    </Page>
  );
};


const AuthenticatedPage = connect(mapStateToProps)(PureAuthenticatedPage);

export { PureAuthenticatedPage };
export default AuthenticatedPage;
