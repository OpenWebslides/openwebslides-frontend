// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

import SubmitButtonGroup from 'components/SubmitButtonGroup';

type TopicFormValues = {|
  title: string,
  description: string,
|};

type TopicFormErrors = {|
  title: string,
|};

type PassedProps = {|
  onSubmit: (values: TopicFormValues) => void,
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureTopicForm extends React.Component<Props> {
  validateForm = (values: TopicFormValues): TopicFormErrors => {
    const { t } = this.props;

    const errors = {};

    if (values.title === '') {
      errors.title = t('topics:forms.errors.title');
    }

    return { ...errors };
  };

  render(): React.Node {
    const { t, onSubmit, children } = this.props;

    return (
      <Formik
        initialValues={{ title: '', description: '' }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <ErrorMessage name="title" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="title"
              id="title"
              placeholder={t('topics:forms.title')}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />

            <ErrorMessage name="description" component={Message} negative={true} />
            <Field
              component={Form.TextArea}
              name="description"
              id="description"
              placeholder={t('topics:forms.description')}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />

            { (children != null) ? children : (<SubmitButtonGroup />)}
          </Form>
        )}
      </Formik>
    );
  }
}

const TopicForm = withNamespaces()(PureTopicForm);

export type { TopicFormValues };
export { PureTopicForm };
export default TopicForm;
