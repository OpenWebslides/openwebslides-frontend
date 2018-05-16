// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Link, Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import type { State } from 'types/state';
import sidebar from 'modules/sidebar';

import topics from 'modules/topics';

import AuthenticatedPage from '../AuthenticatedPage';

const { SidebarMenu, SidebarWrapper } = sidebar.components;
const { getAmountOfSidebars } = sidebar.selectors;
const { SIDEBAR_LENGTH, AMOUNT_OF_COLS_IN_GRID } = sidebar.constants;

type RouteProps = {
  match: Match,
};

type StateProps = {
  amountOfSidebars: ?number, // undefined if state is not yet initialized
};

type Props = CustomTranslatorProps & RouteProps & StateProps;

const mapStateToProps = (state: State): StateProps => {
  const amountOfSidebars = getAmountOfSidebars(state);

  return {
    amountOfSidebars,
  };
};

const TopicEditor = topics.components.Editor;

const PureTopicEditorForId = (props: Props): React.Node => {
  const {
    match,
    amountOfSidebars,
  } = props;

  const topicId = match.params.id;
  if (topicId == null) { // Null check necessary for flow
    return null;
  }
  const amount = amountOfSidebars != null ? amountOfSidebars : 0;

  const sidebarWrapperWidth = SIDEBAR_LENGTH * amount;
  const editorWidth = AMOUNT_OF_COLS_IN_GRID - sidebarWrapperWidth;

  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width={editorWidth}>
          <TopicEditor topicId={topicId} />
        </Grid.Column>
        { sidebarWrapperWidth > 0 &&
          <Grid.Column className="editor__sidebar" width={sidebarWrapperWidth}>
            <SidebarWrapper topicId={topicId} />
          </Grid.Column>
        }
      </Grid>
      <SidebarMenu />
    </React.Fragment>
  );
};

const TopicEditorForId = connect(mapStateToProps)(PureTopicEditorForId);


const DummyContent = (props: RouteProps): React.Node => {
  const { match } = props;

  return (
    <div>
      <p>Dummy topic links:</p>
      <ul>
        <li><Link to={`${match.url}/feeyhnd0w0`}>Test topic 1</Link></li>
        <li><Link to={`${match.url}/exrhrl5gvy`}>Test topic 2</Link></li>
      </ul>
    </div>
  );
};

const PureEditorPage = (props: Props): React.Node => {
  return (
    <AuthenticatedPage>
      <Switch>
        <Route path={`${props.match.url}/:id`} component={TopicEditorForId} />
        <Route component={DummyContent} />
      </Switch>
    </AuthenticatedPage>
  );
};

const EditorPage = translate()(PureEditorPage);

export { PureEditorPage };
export default EditorPage;
