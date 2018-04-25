// @flow

import * as React from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, Button } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import type { State } from 'types/state';
import type { UserType } from 'modules/users';

import { isAuthenticated, getAccount } from '../../selectors';
import { reset } from '../../actions';

type PassedProps = {
};


type StateProps = {
  authenticated: boolean,
  account: ?UserType,
};

type DispatchProps = {
  handleSubmit: () => void,
};

type Props = CustomTranslatorProps & PassedProps & StateProps & DispatchProps;

type ValuesType = {
  email: string,
  password: string,
};

const handleConfirm = (values: ValuesType, dispatch: Dispatch<*>): void => {
  dispatch(reset(values.email));
};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    authenticated: isAuthenticated(state),
    account: getAccount(state),
  };
};

const PureConfirmForm = (props: Props): React.Node => {
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
          placeholder={t('auth:input.email')}
          icon="at"
          iconPosition="left"
        />
      </Form.Field>

      <Button.Group fluid={true}>
        <Button primary={true} type="submit">
          {t('auth:button.reset')}
        </Button>
        <Button secondary={true} as={Link} to="/auth/signin">
          {t('auth:button.back')}
        </Button>
      </Button.Group>
    </Form>
  );
};

const ReduxConfirmForm = reduxForm({
  // Unique name for the from
  form: 'confirm',
  onSubmit: handleConfirm,
})(PureConfirmForm);
const ConfirmForm = connect(mapStateToProps)(translate()(ReduxConfirmForm));

export { PureConfirmForm, ReduxConfirmForm };
export default ConfirmForm;
