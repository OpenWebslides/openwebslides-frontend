// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';

import { type DropdownValue } from 'types/forms';
import AccessLevelForm from 'forms/AccessLevelForm';

import * as m from '../../../model';

type PassedProps = {|
  onSubmit: () => void,
  access: m.AccessType,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureAccessControl = (props: Props): React.Node => {
  const { t, onSubmit, access } = props;

  return (
    <AccessLevelForm
      onSubmit={onSubmit}
      access={access}
      availableAccess={Object.keys(m.accessTypes).map(
        (g: string): DropdownValue => {
          const accessType = m.accessTypes[g];

          return { key: accessType, value: accessType, text: t(`topics:props.access.accessForType.${accessType}`) };
        },
      )}
    />
  );
};

const AccessControl = withNamespaces()(PureAccessControl);

export { PureAccessControl };
export default AccessControl;
