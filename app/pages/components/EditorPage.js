// @flow

import * as React from 'react';
import { translate } from 'react-i18next';
import type { CustomTranslatorProps } from 'types/translator';
import { Link, Route, Switch } from 'react-router-dom';
import type { Match } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import topics from 'modules/topics';

import Page from '../Page';


type RouteProps = {
  match: Match,
};

type Props = CustomTranslatorProps & RouteProps;


const TopicEditor = topics.components.Editor;

const PureTopicEditorForId = (props: Props): React.Node => {
  const { match } = props;

  const topicId = match.params.id;
  if (topicId == null) { // Null check necessary for flow
    return null;
  }

  return (
    <React.Fragment>
      <Grid>
        <Grid.Column>
          <TopicEditor topicId={topicId} />
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

const TopicEditorForId = PureTopicEditorForId;


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

const PureEditorPage = (props: RouteProps): React.Node => {
  const { match } = props;

  return (
    <Page needsAuth={true} needsSidebar={true}>
      <Switch>
        <Route path={`${match.url}/:id`} component={TopicEditorForId} />
        <Route component={DummyContent} />
      </Switch>
    </Page>
  );
};

const EditorPage = translate()(PureEditorPage);

export { PureEditorPage };
export default EditorPage;
