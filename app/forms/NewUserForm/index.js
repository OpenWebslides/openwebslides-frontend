// @flow

import * as React from 'react';
import { Trans, withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

import { TOS_ROUTE } from 'config/routes';
import SubmitButtonGroup from 'components/SubmitButtonGroup';

type NewUserFormValues = {|
  email: string,
  password: string,
  repeatPassword: string,
  name: string,
  tosAccepted: boolean,
|};

type PassedProps = {|
  onSubmit: (values: NewUserFormValues) => void,
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureNewUserForm extends React.Component<Props> {
  validateForm = (values: NewUserFormValues): NewUserFormValues => {
    const { t } = this.props;

    const errors = {};

    if (!values.email.includes('@')) {
      errors.email = t('users:forms.errors.email');
    }

    if (values.password.length < 6) {
      errors.password = t('users:forms.errors.password');
    }

    if (values.repeatPassword !== values.password) {
      errors.repeatPassword = t('users:forms.errors.repeatPassword');
    }

    if (values.name === '') {
      errors.name = t('users:forms.errors.name');
    }

    if (values.tosAccepted === false) {
      errors.tosAccepted = t('users:forms.errors.tosAccepted');
    }

    return { ...errors };
  };

  render(): React.Node {
    const { t, onSubmit, children } = this.props;

    return (
      <Formik
        initialValues={{ email: '', name: '', password: '', repeatPassword: '', tosAccepted: false }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ErrorMessage name="email" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="email"
              id="email"
              placeholder={t('users:forms.email')}
              icon="at"
              iconPosition="left"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            <ErrorMessage name="name" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="name"
              id="name"
              placeholder={t('users:forms.name')}
              icon="user"
              iconPosition="left"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />

            <ErrorMessage name="password" component={Message} negative={true} />
            <Field
              component={Form.Input}
              type="password"
              name="password"
              id="password"
              placeholder={t('users:forms.password')}
              icon="lock"
              iconPosition="left"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            <ErrorMessage name="repeatPassword" component={Message} negative={true} />
            <Field
              component={Form.Input}
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              placeholder={t('users:forms.repeatPassword')}
              icon="lock"
              iconPosition="left"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.repeatPassword}
            />

            <p>
              {/* TODO: using <Link> here seems to throw an error */}
              <Trans i18nKey="users:forms.tosDescription">
                <a href={TOS_ROUTE} target="_blank" rel="noopener noreferrer">TOS</a>
              </Trans>
            </p>

            <ErrorMessage name="tosAccepted" component={Message} negative={true} />
            <Field
              component={Form.Checkbox}
              type="checkbox"
              name="tosAccepted"
              id="tosAccepted"
              label={t('users:forms.tos')}
              onChange={handleChange}
              onBlur={handleBlur}
              checked={values.tosAccepted}
            />

            { (children != null) ? children : (<SubmitButtonGroup />)}
          </Form>
        )}
      </Formik>
    );
  }
}

const NewUserForm = withNamespaces()(PureNewUserForm);

export type { NewUserFormValues };
export { PureNewUserForm };
export default NewUserForm;
