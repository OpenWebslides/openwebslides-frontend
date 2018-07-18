// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Grid } from 'semantic-ui-react';

import Page from 'core-components/Page';
import FlashMessages from 'core-components/flash/FlashMessages';
import platform from 'modules/platform';

const { UnauthWrapper, ConfirmEmailCard } = platform.components;

type Props = TranslatorProps;

const PureConfirmPage = (props: Props): React.Node => {
  return (
    <UnauthWrapper redirectIfAuthenticated="/">
      <Page>
        <Grid centered={true} verticalAlign="middle">
          <Grid.Column width={6}>
            <FlashMessages />
            <ConfirmEmailCard />
          </Grid.Column>
        </Grid>
      </Page>
    </UnauthWrapper>
  );
};

const ConfirmPage = translate()(PureConfirmPage);

export { PureConfirmPage };
export default ConfirmPage;
