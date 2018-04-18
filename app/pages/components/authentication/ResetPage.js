// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Grid } from 'semantic-ui-react';

import authentication from 'modules/authentication';

import Page from 'pages/Page';

type Props = CustomTranslatorProps & { /* new props go here */ };

const { ResetCard } = authentication.components;

const PureResetPage = (props: Props): React.Node => {
  return (
    <Page>
      <Grid centered={true} verticalAlign="middle">
        <Grid.Column width={6}>
          <ResetCard />
        </Grid.Column>
      </Grid>
    </Page>
  );
};

const ResetPage = translate()(PureResetPage);

export { PureResetPage };
export default ResetPage;
