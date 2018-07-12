// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import { Grid } from 'semantic-ui-react';

import type { CustomTranslatorProps } from 'types/translator';
import FlashMessages from 'core-components/flash/FlashMessages';
import authentication from 'modules/authentication';

import Page from '../../Page';

type Props = CustomTranslatorProps & { /* new props go here */ };

const { ConfirmCard } = authentication.components;

const PureConfirmPage = (props: Props): React.Node => {
  return (
    // $FlowFixMe Can't figure out cause; Page component needs rewriting anyway #TODO
    <Page>
      <Grid centered={true} verticalAlign="middle">
        <Grid.Column width={6}>
          <FlashMessages />

          <ConfirmCard />
        </Grid.Column>
      </Grid>
    </Page>
  );
};

const ConfirmPage = translate()(PureConfirmPage);

export { PureConfirmPage };
export default ConfirmPage;
