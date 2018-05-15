// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Link, Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import sidebar from 'modules/sidebar';

import topics from 'modules/topics';

import AuthenticatedPage from '../AuthenticatedPage';

const { SidebarMenu, SidebarWrapper } = sidebar.components;

type RouteProps = {
  match: Match,
};

type Props = CustomTranslatorProps & RouteProps;

const TopicEditor = topics.components.Editor;

const TopicEditorForId = (props: RouteProps): React.Node => {
  const { match } = props;
  const topicId = match.params.id;

  return (
    <React.Fragment>
      <Grid>
        <Grid.Column width={6}>
          <TopicEditor topicId={topicId} />
        </Grid.Column>
        <Grid.Column className="editor__sidebar" width={5}>
          <SidebarWrapper />
        </Grid.Column>
        <Grid.Column className="editor__sidebar" width={5}>
          <SidebarWrapper />
        </Grid.Column>
      </Grid>
      <SidebarMenu />
    </React.Fragment>
  );
};


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
