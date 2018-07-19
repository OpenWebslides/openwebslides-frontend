// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Image, Menu, Grid } from 'semantic-ui-react';

import logo from 'assets/images/logo_white.png';

type Props = TranslatorProps;

const PureLogo = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Menu.Item header={true} as={Link} to="/">
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={logo} />
          </Grid.Column>
          <Grid.Column width={12} verticalAlign="middle">
            <Menu.Item>
              <strong>{t('global:openwebslides')}</strong>
            </Menu.Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Menu.Item>
  );
};

const Logo = translate()(PureLogo);

export { PureLogo };
export default Logo;
