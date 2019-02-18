// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Form } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type TFunction } from 'types/i18next';
import FormErrorMessage from 'components/FormErrorMessage';

type FeedbackFormValues = {|
  feedback: string,
|};

type FeedbackFormErrors = {|
  feedback: string,
|};

type PassedProps = {|
  onSubmit: (values: FeedbackFormValues) => void,
  required: boolean,
|};

type Props = {| ...PassedProps |};

class PureFeedbackForm extends React.Component<Props> {
  validateForm = (values: FeedbackFormValues): FeedbackFormErrors => {
    const { required } = this.props;

    const errors = {};

    if (required && values.feedback === '') {
      errors.feedback = 'pullRequests:forms.errors.feedback';
    }

    return { ...errors };
  };

  render(): React.Node {
    const { onSubmit } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Formik
            initialValues={{ feedback: '' }}
            validate={this.validateForm}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit} id="feedback-form">
                <FormErrorMessage name="feedback" />
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
        )}
      </Translation>
    );
  }
}

const FeedbackForm = PureFeedbackForm;

export type { FeedbackFormValues };
export { PureFeedbackForm };
export default FeedbackForm;
