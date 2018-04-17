// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';
import { Grid } from 'semantic-ui-react';

import authentication from 'modules/authentication';

import Page from 'pages/Page';

type Props = TranslatorProps & { /* new props go here */ };

const { ConfirmCard } = authentication.components;

const PureConfirmPage = (props: Props): React.Node => {
  return (
    <Page>
      <Grid centered={true} verticalAlign="middle">
        <Grid.Column width={6}>
          <ConfirmCard />
        </Grid.Column>
      </Grid>
    </Page>
  );
};

const ConfirmPage = translate()(PureConfirmPage);

export { PureConfirmPage };
export default ConfirmPage;
