// @flow

import * as React from 'react';
import { Grid } from 'semantic-ui-react';

import NavigationBar from './helpers/NavigationBar';

const GRID_COLS_COUNT = 16;

type PassedProps = {|
  children: React.Node,
  prependNode: ?React.Node,
  appendNode: ?React.Node,
  prependAndAppendColsCount: number,
|};

type Props = {|
  ...PassedProps,
|};

const PurePage = (props: Props): React.Node => {
  const { children, prependNode, appendNode, prependAndAppendColsCount } = props;

  return (
    <div>
      <NavigationBar />
      <div className="page-layout__grid">
        <Grid stretched={true}>
          { prependNode }
          <Grid.Column width={GRID_COLS_COUNT - prependAndAppendColsCount}>
            <div>
              {children}
            </div>
          </Grid.Column>
          { appendNode }
        </Grid>
      </div>
    </div>
  );
};

PurePage.defaultProps = {
  prependNode: null,
  appendNode: null,
  prependAndAppendColsCount: 0,
};

const Page = PurePage;

export { PurePage };
export default Page;
