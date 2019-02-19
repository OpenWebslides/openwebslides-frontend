// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Form } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type TFunction } from 'types/i18next';
import FormErrorMessage from 'components/FormErrorMessage';

type CommitFormValues = {|
  message: string,
|};

type CommitFormErrors = $ObjMap<CommitFormValues, () => string>;

type PassedProps = {|
  onSubmit: (values: CommitFormValues) => void,
|};

type Props = {| ...PassedProps |};

class PureCommitForm extends React.Component<Props> {
  validateForm = (values: CommitFormValues): CommitFormErrors => {
    const errors = {};

    if (values.message === '') {
      errors.message = 'topics:forms.errors.message.empty';
    }

    if (values.message.length < 5 || values.message.length > 60) {
      errors.message = 'topics:forms.errors.message.length';
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
              <Form onSubmit={handleSubmit} id="commit-form">
                <FormErrorMessage name="message" />
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
        )}
      </Translation>
    );
  }
}

const CommitForm = PureCommitForm;

export type { CommitFormValues };
export { PureCommitForm };
export default CommitForm;
