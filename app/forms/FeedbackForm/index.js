// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

type FeedbackFormValues = {|
  feedback: string,
|};

type FeedbackFormErrors = {|
  feedback: string,
|};

type PassedProps = {|
  onSubmit: (values: FeedbackFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureFeedbackForm extends React.Component<Props> {
  validateForm = (values: FeedbackFormValues): FeedbackFormErrors => {
    const { t } = this.props;

    const errors = {};

    if (values.feedback === '') {
      errors.feedback = t('pullRequests:forms.errors.feedback');
    }

    return { ...errors };
  };

  render(): React.Node {
    const { t, onSubmit } = this.props;

    return (
      <Formik
        initialValues={{ feedback: '' }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit} id="feedback-form">
            <ErrorMessage name="feedback" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="feedback"
              id="feedback"
              placeholder={t('pullRequests:forms.feedback')}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.feedback}
            />
          </Form>
        )}
      </Formik>
    );
  }
}

const FeedbackForm = withNamespaces()(PureFeedbackForm);

export type { FeedbackFormValues };
export { PureFeedbackForm };
export default FeedbackForm;
