// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link, Route, Switch, type ContextRouter as RouterProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

import Page from 'core-components/Page';
import topics from 'modules/topics';

type Props = {|
  ...TranslatorProps,
  ...RouterProps,
|};

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

const DummyContent = (props: Props): React.Node => {
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
  const { match } = props;

  return (
    // $FlowFixMe Can't figure out cause; Page component needs rewriting anyway #TODO
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
