// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

type CommitFormValues = {|
  message: string,
|};

type PassedProps = {|
  onSubmit: (values: CommitFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureCommitForm extends React.Component<Props> {
  validateForm = (values: CommitFormValues): CommitFormValues => {
    const { t } = this.props;

    const errors = {};

    if (values.message === '') {
      errors.message = t('topics:forms.errors.message.empty');
    }

    if (values.message.length < 5 || values.message.length > 60) {
      errors.message = t('topics:forms.errors.message.length');
    }

    return { ...errors };
  };

  render(): React.Node {
    const { t, onSubmit } = this.props;

    return (
      <Formik
        initialValues={{ message: '' }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit} id="commit-form">
            <ErrorMessage name="message" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="message"
              id="message"
              inverted={true}
              placeholder={t('topics:forms.message')}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
          </Form>
        )}
      </Formik>
    );
  }
}

const CommitForm = withNamespaces()(PureCommitForm);

export type { CommitFormValues };
export { PureCommitForm };
export default CommitForm;
