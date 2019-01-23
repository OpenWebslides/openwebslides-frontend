// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Header, Icon } from 'semantic-ui-react';
import { Formik } from 'formik';

import { type DropdownValue } from 'types/forms';
import SemanticField from 'components/SemanticField';
import topics from 'modules/topics';

type AccessLevelFormValues = {|
  access: topics.model.AccessType,
|};

type PassedProps = {|
  access: topics.model.AccessType,
  availableAccess: $ReadOnlyArray<DropdownValue>,
  onSubmit: (values: AccessLevelFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureAccessLevelForm extends React.Component<Props> {
  handleChange = (newAccess: topics.model.AccessType): void => {
    const { access, onSubmit } = this.props;

    if (newAccess !== access) onSubmit({ access: newAccess });
  };

  render(): React.Node {
    const { t, onSubmit, access, availableAccess } = this.props;

    return (
      <Formik
        initialValues={{ access }}
        onSubmit={onSubmit}
      >
        {({ values, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <SemanticField
              component={Form.Dropdown}
              name="access"
              id="access"
              onChange={this.handleChange}
              value={values.access}
              trigger={<><Icon name="lock" /> {t(`topics:props.access.accessForType.${access}`)}</>}
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
          </Form>
        )}
      </Formik>
    );
  }
}

const AccessLevelForm = withNamespaces()(PureAccessLevelForm);

export type { AccessLevelFormValues };
export { PureAccessLevelForm };
export default AccessLevelForm;
