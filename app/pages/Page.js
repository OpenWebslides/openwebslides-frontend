// @flow

import * as React from 'react';
import type { CustomTranslatorProps } from 'types/translator';
import { translate } from 'react-i18next';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import type { State } from 'types/state';

import NavigationBar from 'core-components/navigation/NavigationBar';
import authentication from 'modules/authentication';
import sidebars from 'modules/sidebars';

const { isAuthenticated } = authentication.selectors;

const { SidebarMenu, SidebarWrapper } = sidebars.components;
const { getAllByName } = sidebars.selectors;
const { SIDEBAR_LENGTH, AMOUNT_OF_COLS_IN_GRID } = sidebars.constants;

type RouteProps = {
  match: Match,
};

type StateProps = {
  authenticated: boolean,
  amountOfSidebars: number,
};

type PassedProps = {
  children: React.Node,
  needsAuth?: boolean,
  needsSidebar?: boolean,
};

type SidebarProps = {
  match: ?Match,
  width: number,
};

type Props = CustomTranslatorProps & PassedProps & StateProps & RouteProps;


const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const {
    needsAuth,
    needsSidebar,
  } = props;

  let amountOfSidebars:number = 0;

  if (needsSidebar) {
    const sidebarsByName = getAllByName(state);
    amountOfSidebars = sidebarsByName != null ? sidebarsByName.length : 0;
  }

  return {
    authenticated: needsAuth ? isAuthenticated(state) : true,
    amountOfSidebars,
  };
};


const SidebarComponent = (props: SidebarProps): React.Node => {
  const {
    match,
    width,
  } = props;

  const topicId = match.params.id;

  if (topicId == null) { // Null check necessary for flow
    return null;
  }

  return (
    <React.Fragment>
      { width > 0 &&
        <Grid.Column className="sidebarWrapper" width={width}>
          <SidebarWrapper topicId={topicId} />
        </Grid.Column>
      }
    </React.Fragment>
  );
};


const PurePage = (props: Props): React.Node => {
  const {
    authenticated,
    amountOfSidebars,
    needsSidebar,
  } = props;

  if (!authenticated) {
    return <Redirect to="/auth/signin" />;
  }

  const sidebarWrapperWidth = SIDEBAR_LENGTH * amountOfSidebars;
  // TODO: find better solution (also change sidebar width constant back to 5)
  // -1 for better padding between columns
  const contentWidth = AMOUNT_OF_COLS_IN_GRID - sidebarWrapperWidth - 1;

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="page-layout__grid">
        <Grid stretched={true}>
          <Grid.Column width={contentWidth}>
            <div>
              {props.children}
            </div>
          </Grid.Column>
          <Route
            path={`${props.match.url}/:id`}
            render={(sidebarProps) => (
              <SidebarComponent {...sidebarProps} width={sidebarWrapperWidth} />
            )}
          />
        </Grid>
        { needsSidebar &&
          <SidebarMenu />
        }
      </div>
    </React.Fragment>
  );
};

const Page = withRouter(connect(mapStateToProps)(translate()(PurePage)));

export { PurePage };
export default Page;
