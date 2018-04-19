// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Grid } from 'semantic-ui-react';

import authentication from 'modules/authentication';

import Page from 'pages/Page';

type Props = CustomTranslatorProps & { /* new props go here */ };

const { SigninCard } = authentication.components;

const PureSigninPage = (props: Props): React.Node => {
  return (
    <Page>
      <Grid centered={true} verticalAlign="middle">
        <Grid.Column width={6}>
          <SigninCard />
        </Grid.Column>
      </Grid>
    </Page>
  );
};

const SigninPage = translate()(PureSigninPage);

export { PureSigninPage };
export default SigninPage;
