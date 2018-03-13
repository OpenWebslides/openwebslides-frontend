// @flow

import * as React from 'react';
import type { TranslatorProps } from 'react-i18next';
import { translate } from 'react-i18next';
import { Container, Grid } from 'semantic-ui-react';

import NavigationBar from 'core-components/navigation/NavigationBar';

type ChildrenProps = {
  children: React.Node,
};

type Props = TranslatorProps & ChildrenProps;

const Page = (props: Props): React.Node => {
  return (
    <div>
      <NavigationBar />
      <Grid stretched={true} relaxed="very">
        <Grid.Column width={1} />
        <Grid.Column stretched={true} width={14}>
          <Container>
            {props.children}
          </Container>
        </Grid.Column>
      </Grid>
    </div>
  );
};


export { Page as PurePage };
export default translate()(Page);
