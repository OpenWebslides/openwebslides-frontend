// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Message } from 'semantic-ui-react';
import { Formik, Field, ErrorMessage } from 'formik';

type MetadataFormValues = {|
  title: string,
  description: ?string,
|};

type PassedProps = {|
  onSubmit: (values: MetadataFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureMetadataForm extends React.Component<Props> {
  validateForm = (values: MetadataFormValues): MetadataFormValues => {
    const { t } = this.props;

    const errors = {};

    if (values.title === '') {
      errors.title = t('topics:forms.errors.title.empty');
    }

    // This will never happen, but it's need to make Flow happy
    if (values.description == null) {
      errors.description = null;
    }

    return { ...errors };
  };

  render(): React.Node {
    const { t, onSubmit, title, description } = this.props;

    return (
      <Formik
        initialValues={{ title, description }}
        validate={this.validateForm}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit} id="metadata-form">
            <ErrorMessage name="title" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="title"
              id="title"
              inverted={true}
              label={t('topics:forms.title')}
              placeholder={t('topics:forms.title')}
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />

            <ErrorMessage name="description" component={Message} negative={true} />
            <Field
              component={Form.Input}
              name="description"
              id="description"
              inverted={true}
              label={t('topics:forms.description')}
              placeholder={t('topics:forms.description')}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
          </Form>
        )}
      </Formik>
    );
  }
}

const MetadataForm = withNamespaces()(PureMetadataForm);

export type { MetadataFormValues };
export { PureMetadataForm };
export default MetadataForm;
