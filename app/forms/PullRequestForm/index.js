// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

type PullRequestFormValues = {|
  message: string,
|};

type PullRequestFormErrors = {|
  message: string,
|};

type PassedProps = {|
  onSubmit: (values: PullRequestFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PurePullRequestForm extends React.Component<Props> {
  validateForm = (values: PullRequestFormValues): PullRequestFormErrors => {
    const { t } = this.props;

    const errors = {};

    if (values.message === '') {
      errors.message = t('pullRequests:forms.errors.title');
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
          <Form onSubmit={handleSubmit}>
            <ErrorMessage name="message" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="message"
              id="message"
              placeholder={t('pullRequests:forms.message')}
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

const PullRequestForm = withNamespaces()(PurePullRequestForm);

export type { PullRequestFormValues };
export { PurePullRequestForm };
export default PullRequestForm;
