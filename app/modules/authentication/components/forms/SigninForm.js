// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { translate, type TranslatorProps } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, Button } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import type { State } from 'types/state';
// import type { User } from 'modules/users';

import { isAuthenticated, getAccount } from '../../selectors';
import { signinEmail } from '../../actions';

type StateProps = {|
  authenticated: boolean,
  // #TODO replace with userId to remove depentency on modules/users
  // eslint-disable-next-line flowtype/no-weak-types
  account: any,
|};

type DispatchProps = {|
  handleSubmit: () => void,
|};

type Props = {|
  ...TranslatorProps,
  ...StateProps,
  ...DispatchProps,
|};

type ValuesType = {
  email: string,
  password: string,
};

const handleSignin = (values: ValuesType, dispatch: Dispatch<*>): void => {
  dispatch(signinEmail(values.email, values.password));
};

const mapStateToProps = (state: State): StateProps => {
  return {
    authenticated: isAuthenticated(state),
    account: getAccount(state),
  };
};

const PureSigninForm = (props: Props): React.Node => {
  const { t, handleSubmit, authenticated } = props;

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Field
          component={Input}
          name="email"
          placeholder={t('authentication:input.email')}
          icon="at"
          iconPosition="left"
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={Input}
          name="password"
          type="password"
          placeholder={t('authentication:input.password')}
          icon="lock"
          iconPosition="left"
        />
      </Form.Field>

      <Button.Group fluid={true}>
        <Button primary={true} type="submit">
          {t('authentication:button.signin')}
        </Button>
        <Button secondary={true} as={Link} to="/auth/signup">
          {t('authentication:button.signup')}
        </Button>
      </Button.Group>
    </Form>
  );
};

const ReduxSigninForm = reduxForm({
  // Unique name for the from
  form: 'signin',
  onSubmit: handleSignin,
})(PureSigninForm);
const SigninForm = connect(mapStateToProps)(translate()(ReduxSigninForm));

export { PureSigninForm, ReduxSigninForm };
export default SigninForm;
