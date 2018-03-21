// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { Dropdown } from 'semantic-ui-react';

type Props = TranslatorProps;

const PureAccountDropdown = (props: Props): React.node => {
  const { t } = props;

  return (
    <Dropdown text="User" pointing={true} className="item">
      <Dropdown.Menu>
        <Dropdown.Header>Account</Dropdown.Header>
        <Dropdown.Item>Preferences</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Header>Account</Dropdown.Header>
        <Dropdown.Item>Sign out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const AccountDropdown = translate()(PureAccountDropdown);

export { PureAccountDropdown };
export default AccountDropdown;
