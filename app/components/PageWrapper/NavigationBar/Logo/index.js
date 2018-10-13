// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Image, Grid } from 'semantic-ui-react';

import logo from 'assets/images/logo/logo-white.svg';

type Props = {| ...TranslatorProps |};

const PureLogo = (props: Props): React.Node => {
  const { t } = props;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <Image src={logo.replace(/"/g, '')} />
        </Grid.Column>
        <Grid.Column width={12} verticalAlign="middle">
          {t('global:openwebslides')}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const Logo = withNamespaces()(PureLogo);

export { PureLogo };
export default Logo;
