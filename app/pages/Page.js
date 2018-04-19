// @flow

import * as React from 'react';
import type { CustomTranslatorProps } from 'types/translator';
import { translate } from 'react-i18next';
import { Grid } from 'semantic-ui-react';

import NavigationBar from 'core-components/navigation/NavigationBar';
import modals from 'modules/modals';

const { ModalRoot } = modals.components;

type PassedProps = {
  children: React.Node,
};

type Props = CustomTranslatorProps & PassedProps;

const Page = (props: Props): React.Node => {
  return (
    <React.Fragment>
      <NavigationBar />
      <div className="page-layout__grid">
        <Grid stretched={true}>
          <Grid.Column width={16}>
            <div>
              {props.children}
            </div>
          </Grid.Column>
        </Grid>
      </div>
      <ModalRoot />
    </React.Fragment>
  );
};


export { Page as PurePage };
export default translate()(Page);
