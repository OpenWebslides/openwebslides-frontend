// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Form, Dropdown, Header } from 'semantic-ui-react';
import { Formik } from 'formik';

import { type DropdownValue } from 'types/forms';
import topics from 'modules/topics';

type AccessLevelFormValues = {|
  access: topics.model.AccessType,
|};

type PassedProps = {|
  availableAccess: $ReadOnlyArray<DropdownValue>,
  onSubmit: (values: AccessLevelFormValues) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureAccessLevelForm extends React.Component<Props> {
  handleSubmit = (event: SyntheticInputEvent<HTMLInputElement>, data: any): void => {
    const { onSubmit } = this.props;

    console.log(data.value);

    onSubmit({ access: data.value });
  };

  render(): React.Node {
    const { t, onSubmit, access, availableAccess } = this.props;

    return (
      <Formik
        initialValues={{ access }}
        onSubmit={onSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit} id="access-level-form">
            <Form.Dropdown
              name="access"
              id="access"
              selection={true}
              value={values.access}
              options={availableAccess.map((item: DropdownValue): DropdownValue => {
                return { ...item,
                  content: (
                    <>
                      <Header sub={true}>{item.text}</Header>
                      <Header.Subheader>{t(`topics:props.access.accessDescriptionForType.${item.value}`)}</Header.Subheader>
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
