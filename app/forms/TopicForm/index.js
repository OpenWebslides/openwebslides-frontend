// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Form } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type TFunction } from 'types/i18next';
import FormErrorMessage from 'components/FormErrorMessage';
import SubmitButtonGroup from 'components/SubmitButtonGroup';

type TopicFormValues = {|
  title: string,
  description: string,
|};

type PassedProps = {|
  onSubmit: (values: TopicFormValues) => void,
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...PassedProps |};

class PureTopicForm extends React.Component<Props> {
  validateForm = (values: TopicFormValues): TopicFormValues => {
    const errors = {};

    if (values.title === '') {
      errors.title = 'topics:forms.errors.title';
    }

    if (values.title.length > 100) {
      errors.title = 'topics:forms.errors.title.length';
    }

    if (values.description != null && values.description.length > 200) {
      errors.description = 'topics:forms.errors.description.length';
    }

    return { ...errors };
  };

  render(): React.Node {
    const { onSubmit, children } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Formik
            initialValues={{ title: '', description: '' }}
            validate={this.validateForm}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <FormErrorMessage name="title" />
                <Field
                  component={Form.Input}
                  name="title"
                  id="title"
                  placeholder={t('topics:forms.title')}
                  required={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                  maxLength={100}
                />

                <FormErrorMessage name="description" />
                <Field
                  component={Form.TextArea}
                  name="description"
                  id="description"
                  placeholder={t('topics:forms.description')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  maxLength={200}
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

const TopicForm = PureTopicForm;

export type { TopicFormValues };
export { PureTopicForm };
export default TopicForm;
