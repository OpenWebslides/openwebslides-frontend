// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

import SubmitButtonGroup from 'components/SubmitButtonGroup';

type CommitFormValues = {|
  message: string,
|};

type PassedProps = {|
  onSubmit: (values: CommitFormValues) => void,
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureCommitForm extends React.Component<Props> {
  validateForm = (values: CommitFormValues): CommitFormValues => {
    const { t } = this.props;

    const errors = {};

    if (values.message === '') {
      errors.message = t('topics:forms.errors.message');
    }

    return { ...errors };
  }

  render(): React.Node {
    const { t, onSubmit, children } = this.props;

    return (
      <Formik
        initialValues={{ message: '' }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit} id="topic-editor-commit-modal-form">
            <ErrorMessage name="message" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="message"
              id="message"
              placeholder={t('topics:forms.message')}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            { (children != null) ? children : (<SubmitButtonGroup />)}
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
