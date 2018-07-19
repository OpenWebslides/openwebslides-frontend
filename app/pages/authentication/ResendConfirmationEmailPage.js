// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Grid } from 'semantic-ui-react';

import Page from 'core-components/Page';
import FlashMessages from 'core-components/flash/FlashMessages';
import platform from 'modules/platform';

const { UnauthWrapper, ResendConfirmationEmailCard } = platform.components;

type Props = TranslatorProps;

const PureResendConfirmationEmailPage = (props: Props): React.Node => {
  return (
    <UnauthWrapper redirectIfAuthenticated="/">
      <Page>
        <Grid centered={true} verticalAlign="middle">
          <Grid.Column width={6}>
            <FlashMessages />
            <ResendConfirmationEmailCard />
          </Grid.Column>
        </Grid>
      </Page>
    </UnauthWrapper>
  );
};

const ResendConfirmationEmailPage = translate()(PureResendConfirmationEmailPage);

export { PureResendConfirmationEmailPage };
export default ResendConfirmationEmailPage;
