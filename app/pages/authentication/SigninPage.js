// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Grid } from 'semantic-ui-react';

import Page from 'core-components/Page';
import FlashMessages from 'core-components/flash/FlashMessages';
import authentication from 'modules/authentication';

type Props = TranslatorProps;

const { SigninCard } = authentication.components;

const PureSigninPage = (props: Props): React.Node => {
  return (
    // $FlowFixMe Can't figure out cause; Page component needs rewriting anyway #TODO
    <Page>
      <Grid centered={true} verticalAlign="middle">
        <Grid.Column width={6}>
          <FlashMessages />

          <SigninCard />
        </Grid.Column>
      </Grid>
    </Page>
  );
};

const SigninPage = translate()(PureSigninPage);

export { PureSigninPage };
export default SigninPage;
