// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message, Divider } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

import users from 'modules/users';

type ProfileFormValues = {|
  name: string,
|};

type PassedProps = {|
  user: users.model.User,
  onSubmit: (values: ProfileFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureProfileForm extends React.Component<Props> {
  validateForm = (values: ProfileFormValues): ProfileFormValues => {
    const { t } = this.props;

    const errors = {};

    if (values.name === '') {
      errors.name = t('users:forms.errors.name');
    }

    return { ...errors };
  };

  render(): React.Node {
    const { t, onSubmit, children, user } = this.props;

    return (
      <Formik
        initialValues={{ name: user.name }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ErrorMessage name="name" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="name"
              id="name"
              label={t('users:forms.name')}
              placeholder={t('users:forms.name')}
              icon="user"
              iconPosition="left"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              data-test-id="profile-form-field-name"
            />

            <Divider hidden={true} />

            {children}
          </Form>
        )}
      </Formik>
    );
  }
}

const ProfileForm = withNamespaces()(PureProfileForm);

export type { ProfileFormValues };
export { PureProfileForm };
export default ProfileForm;
