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
const { getAllActiveSidebars } = sidebars.selectors;
const { SIDEBAR_LENGTH, AMOUNT_OF_COLS_IN_GRID } = sidebars.constants;

type RouterProps = {
  match: Match,
};

type StateProps = {
  authenticated: boolean,
  amountOfSidebars: number,
};

type PassedProps = {
  needsAuth: boolean,
  needsSidebar: boolean,
  children: React.Node,
};

type SidebarProps = {
  match: Match,
  amountOfCols: number,
};

type Props = CustomTranslatorProps & PassedProps & StateProps & RouterProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const {
    needsAuth,
    needsSidebar,
  } = props;

  let amountOfSidebars:number = 0;

  if (needsSidebar) {
    const activeSidebars = getAllActiveSidebars(state);
    amountOfSidebars = activeSidebars != null ? activeSidebars.length : 0;
  }

  return {
    authenticated: needsAuth ? isAuthenticated(state) : true,
    amountOfSidebars,
  };
};


const SidebarComponent = (props: SidebarProps): React.Node => {
  const {
    match,
    amountOfCols,
  } = props;

  const topicId = match.params.id;

  if (topicId == null) { // Null check necessary for flow
    return null;
  }

  return (
    <React.Fragment>
      { amountOfCols > 0 &&
        <Grid.Column className="sidebar-column-wrapper" width={amountOfCols}>
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

  const sidebarWrapperCols = SIDEBAR_LENGTH * amountOfSidebars;
  // TODO: find better solution (also change sidebar width constant back to 5)
  // -1 for better padding between columns
  const contentCols = AMOUNT_OF_COLS_IN_GRID - sidebarWrapperCols - 1;

  return (
    <React.Fragment>
      <NavigationBar />
      <div className="page-layout__grid">
        <Grid stretched={true}>
          <Grid.Column width={contentCols}>
            <div>
              {props.children}
            </div>
          </Grid.Column>
          <Route
            path={`${props.match.url}/:id`}
            // #TODO
            // eslint-disable-next-line react/jsx-no-bind
            render={(sidebarProps) => (
              <SidebarComponent {...sidebarProps} amountOfCols={sidebarWrapperCols} />
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

const connectedPage = connect(mapStateToProps)(translate()(PurePage));
const Page = withRouter(connectedPage);

export { PurePage };
export default Page;
