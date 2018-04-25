// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, Button, Checkbox } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import type { State } from 'types/state';

import { isAuthenticated, getAccount } from '../../selectors';
import type { Account } from '../../model';
import { signup } from '../../actions';

type PassedProps = {
};


type StateProps = {
  authenticated: boolean,
  account: ?Account,
};

type DispatchProps = {
  handleSubmit: () => void,
};

type Props = CustomTranslatorProps & PassedProps & StateProps & DispatchProps;

type ValuesType = {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  tosAccepted: boolean,
};

const handleSignup = (values: ValuesType, dispatch: Dispatch<*>): void => {
  const { email, password, firstName, lastName, tosAccepted } = values;

  dispatch(signup(email, firstName, lastName, password, tosAccepted));
};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    authenticated: isAuthenticated(state),
    account: getAccount(state),
  };
};

// eslint-disable-next-line react/prop-types,flowtype/require-parameter-type
const renderCheckBox = ({ input, label }): Field => {
  return (
    <Checkbox
      label={label}
      checked={!!input.value}
      onChange={(e, { checked }) => input.onChange(checked)}
    />
  );
};

const PureSignupForm = (props: Props): React.Node => {
  const { t, handleSubmit, authenticated } = props;

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Field
          component={Input}
          type="text"
          name="email"
          placeholder={t('auth:input.email')}
          icon="at"
          iconPosition="left"
        />
      </Form.Field>
      <Form.Group inline={false}>
        <Form.Field width={8}>
          <Field
            component={Input}
            type="text"
            name="firstName"
            placeholder={t('auth:input.firstname')}
            icon="user"
            iconPosition="left"
          />
        </Form.Field>
        <Form.Field width={8}>
          <Field
            component={Input}
            type="text"
            name="lastName"
            placeholder={t('auth:input.lastname')}
            icon="user"
            iconPosition="left"
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <Field
          component={Input}
          type="password"
          name="password"
          placeholder={t('auth:input.password')}
          icon="lock"
          iconPosition="left"
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={Input}
          type="password"
          name="repeatpassword"
          placeholder={t('auth:input.repeatpassword')}
          icon="lock"
          iconPosition="left"
        />
      </Form.Field>
      <Form.Field>
        <Field
          component={renderCheckBox}
          name="tosAccepted"
          label={t('auth:input.tos')}
        />
      </Form.Field>

      <Button.Group fluid={true} vertical={true}>
        <Button primary={true} type="submit">
          {t('auth:button.create')}
        </Button>
        <Button secondary={true} as={Link} to="/auth/signin">
          {t('auth:button.back')}
        </Button>
      </Button.Group>
    </Form>
  );
};

const ReduxSignupForm = reduxForm({
  // Unique name for the from
  form: 'signup',
  onSubmit: handleSignup,
})(PureSignupForm);
const SignupForm = connect(mapStateToProps)(translate()(ReduxSignupForm));

export { PureSignupForm, ReduxSignupForm };
export default SignupForm;
