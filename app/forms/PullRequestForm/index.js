// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Form } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type TFunction } from 'types/i18next';
import FormErrorMessage from 'components/FormErrorMessage';

type PullRequestFormValues = {|
  message: string,
|};

type PullRequestFormErrors = $ObjMap<PullRequestFormValues, () => string>;

type PassedProps = {|
  onSubmit: (values: PullRequestFormValues) => void,
|};

type Props = {| ...PassedProps |};

class PurePullRequestForm extends React.Component<Props> {
  validateForm = (values: PullRequestFormValues): PullRequestFormErrors => {
    const errors = {};

    if (values.message === '') {
      errors.message = 'pullRequests:forms.errors.message';
    }

    return errors;
  };

  render(): React.Node {
    const { onSubmit } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Formik
            initialValues={{ message: '' }}
            validate={this.validateForm}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit} id="pull-request-form">
                <FormErrorMessage name="message" />
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
        )}
      </Translation>
    );
  }
}

const PullRequestForm = PurePullRequestForm;

export type { PullRequestFormValues };
export { PurePullRequestForm };
export default PullRequestForm;
