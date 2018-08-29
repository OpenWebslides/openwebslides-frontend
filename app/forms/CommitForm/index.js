// @flow

import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

import { type FormProps } from 'types/form';
import SubmitButtonGroup from 'components/SubmitButtonGroup';

type CommitFormValues = {|
  message?: string,
|};

type PassedProps = {|
  // Use the component's children to add custom buttons to the form;
  // if not set, default of [Submit] | [Back] is used.
  children: React.Node,
|};

type Props = {| ...TranslatorProps, ...$Exact<FormProps>, ...PassedProps |};

const PureCommitForm = (props: Props): React.Node => {
  const { t, handleSubmit, children } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <Field
          component={Input}
          name="message"
          placeholder={t('topics:forms.message')}
          required={true}
          data-test-id="commit-form-message-input"
        />
      </Form.Field>

      { (children != null) ? children : (<SubmitButtonGroup />)}
    </Form>
  );
};

PureCommitForm.defaultProps = {
  children: null,
};

const CommitForm = withNamespaces()(
  reduxForm({ form: 'commitForm' })(PureCommitForm),
);

export type { CommitFormValues };
export { PureCommitForm };
export default CommitForm;
