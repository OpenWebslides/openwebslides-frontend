// @flow

import * as React from 'react';
import { Translation, Trans } from 'react-i18next';
import { Form } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type TFunction } from 'types/i18next';
import { TOS_ROUTE } from 'config/routes';
import FormErrorMessage from 'components/FormErrorMessage';
import SubmitButtonGroup from 'components/SubmitButtonGroup';

type NewUserFormValues = {|
  email: string,
  password: string,
  repeatPassword: string,
  name: string,
  tosAccepted: boolean,
|};

type NewUserFormErrors = $ObjMap<NewUserFormValues, () => string>;

type PassedProps = {|
  onSubmit: (values: NewUserFormValues) => void,
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children?: React.Node,
|};

type Props = {| ...PassedProps |};

class PureNewUserForm extends React.Component<Props> {
  validateForm = (values: NewUserFormValues): NewUserFormErrors => {
    const errors = {};

    if (!values.email.includes('@')) {
      errors.email = 'users:forms.errors.email';
    }

    if (values.password.length < 6) {
      errors.password = 'users:forms.errors.password';
    }

    if (values.repeatPassword !== values.password) {
      errors.repeatPassword = 'users:forms.errors.repeatPassword';
    }

    if (values.name === '') {
      errors.name = 'users:forms.errors.name';
    }

    if (values.tosAccepted === false) {
      errors.tosAccepted = 'users:forms.errors.tosAccepted';
    }

    return errors;
  };

  render(): React.Node {
    const { onSubmit, children } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Formik
            initialValues={{ email: '', name: '', password: '', repeatPassword: '', tosAccepted: false }}
            validate={this.validateForm}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormErrorMessage name="email" />
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

                <FormErrorMessage name="name" />
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

                <FormErrorMessage name="password" />
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

                <FormErrorMessage name="repeatPassword" />
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

                <FormErrorMessage name="tosAccepted" />
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
        )}
      </Translation>
    );
  }
}

const NewUserForm = PureNewUserForm;

export type { NewUserFormValues };
export { PureNewUserForm };
export default NewUserForm;
