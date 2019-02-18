// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Form, Grid, Icon, Header, Button } from 'semantic-ui-react';
import { Formik, Field } from 'formik';

import { type DropdownValue } from 'types/forms';
import { type TFunction } from 'types/i18next';
import FormErrorMessage from 'components/FormErrorMessage';
import SemanticField from 'components/SemanticField';
import topics from 'modules/topics';

type MetadataFormValues = {|
  title: string,
  description: ?string,
  access: topics.model.AccessType,
|};

type PassedProps = {|
  onSubmit: (values: MetadataFormValues) => void,
  onCancel: () => void,
  availableAccess: $ReadOnlyArray<DropdownValue>,
|};

type Props = {| ...PassedProps |};

class PureMetadataForm extends React.Component<Props> {
  validateForm = (values: MetadataFormValues): MetadataFormValues => {
    const { availableAccess } = this.props;

    const errors = {};

    if (values.title === '') {
      errors.title = 'topics:forms.errors.title.empty';
    }

    if (values.title.length > 100) {
      errors.title = 'topics:forms.errors.title.length';
    }

    if (values.description != null && values.description.length > 200) {
      errors.description = 'topics:forms.errors.description.length';
    }

    const match = availableAccess.filter((access: DropdownValue): boolean => {
      return access.value === values.access;
    });
    if (match.length === 0) {
      errors.access = 'topics:forms.errors.access';
    }

    return { ...errors };
  };

  handleCancel = (): void => {
    const { onCancel } = this.props;
    onCancel();
  };

  render(): React.Node {
    const { onSubmit, title, description, access, availableAccess } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <Formik
            initialValues={{ title, description, access }}
            validate={this.validateForm}
            onSubmit={onSubmit}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Grid verticalAlign="middle">
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <FormErrorMessage name="title" />
                      <Field
                        component={Form.Input}
                        name="title"
                        id="title"
                        label={t('topics:forms.title')}
                        placeholder={t('topics:forms.title')}
                        required={true}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                        maxLength={100}
                      />
                    </Grid.Column>
                    <Grid.Column width={4} textAlign="center">
                      <SemanticField
                        component={Form.Dropdown}
                        name="access"
                        id="access"
                        value={values.access}
                        trigger={<><Icon name="lock" /> {t(`topics:props.access.accessForType.${values.access}`)}</>}
                        item={true}
                        options={availableAccess.map((item: DropdownValue): DropdownValue => {
                          return {
                            ...item,
                            content: (
                              <>
                                <Header sub={true}>{item.text}</Header>
                                <Header.Subheader style={{ color: 'rgba(0, 0, 0, 0.40)' }}>
                                  {t(`topics:props.access.accessDescriptionForType.${item.value}`)}
                                </Header.Subheader>
                              </>
                            ) };
                        })}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={12}>
                      <FormErrorMessage name="description" />
                      <Field
                        component={Form.TextArea}
                        name="description"
                        id="description"
                        label={t('topics:forms.description')}
                        placeholder={t('topics:forms.description')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        maxLength={200}
                      />
                    </Grid.Column>
                    <Grid.Column width={4} textAlign="center" style={{ whiteSpace: 'nowrap' }}>
                      <Button
                        type="submit"
                        basic={true}
                        compact={true}
                        data-test-id="topic-metadata-submit-button"
                      >
                        {t('common:button.save')}
                      </Button>
                      &nbsp; {t('common:or')} &nbsp;
                      <Button
                        type="button"
                        className="link"
                        compact={true}
                        onClick={this.handleCancel}
                        data-test-id="topic-metadata-cancel-button"
                      >
                        {t('common:button.cancel').toLowerCase()}
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            )}
          </Formik>
        )}
      </Translation>
    );
  }
}

const MetadataForm = PureMetadataForm;

export type { MetadataFormValues };
export { PureMetadataForm };
export default MetadataForm;
