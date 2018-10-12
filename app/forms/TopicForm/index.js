// @flow

import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

import { type FormProps } from 'types/form';
import SubmitButtonGroup from 'components/SubmitButtonGroup';

type TopicFormValues = {|
  title?: string,
  description?: string,
|};

type PassedProps = {|
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...$Exact<FormProps>, ...PassedProps |};

const PureTopicForm = (props: Props): React.Node => {
  const { t, handleSubmit, children } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Field
          component={Input}
          name="title"
          placeholder={t('topics:forms.title')}
          required={true}
        />
      </Form.Field>
      <Form.Field>
        <Field
          component="textarea"
          name="description"
          placeholder={t('topics:forms.description')}
        />
      </Form.Field>
      { (children != null) ? children : (<SubmitButtonGroup />)}
    </Form>
  );
};

PureTopicForm.defaultProps = {
  children: null,
};

const TopicForm = withNamespaces()(reduxForm({ form: 'topicForm' })(PureTopicForm));

export type { TopicFormValues };
export { PureTopicForm };
export default TopicForm;
