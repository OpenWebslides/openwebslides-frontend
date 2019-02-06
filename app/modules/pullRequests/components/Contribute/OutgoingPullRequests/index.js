// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Item, Icon, Header } from 'semantic-ui-react';

import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';
import topics from 'modules/topics';

import PullRequestEntry from '../../PullRequestEntry';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureOutgoingPullRequests extends React.Component<Props> {
  renderPullRequest = (pullRequestId: string): React.Node => {
    return (
      <Item key={pullRequestId}>
        <Item.Content>
          <PullRequestEntry pullRequestId={pullRequestId} />
        </Item.Content>
      </Item>
    );
  };

  renderOutgoingPullRequests = (upstreamTopic: topics.model.Topic): React.Node => {
    const { t, topic } = this.props;

    return (
      <div data-test-id="outgoing-pull-requests">
        <Header as="h3">
          <Icon name="sign-out alternate" />
          {t('topics:sidebars.contribute.outgoing.title')}
        </Header>
        <Item.Group>
          <Item>
            <Item.Content>
              {topic.outgoingPullRequestIds.length === 0 ? (
                <em data-test-id="outgoing-pull-requests-empty-message">
                  <Trans
                    i18nKey="topics:sidebars.contribute.outgoing.empty"
                    values={{ upstreamTopicTitle: upstreamTopic.title }}
                  >
                    <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: upstreamTopic.id })}>
                      title
                    </Link>
                  </Trans>
                </em>
              ) : (
                <p data-test-id="outgoing-pull-requests-message">{t('topics:sidebars.contribute.outgoing.message')}</p>
              )}
            </Item.Content>
          </Item>

          {(topic.outgoingPullRequestIds.map((id) => this.renderPullRequest(id)))}
        </Item.Group>
      </div>
    );
  };

  render(): React.Node {
    const { topic } = this.props;

    return (
      <FetchWrapper
        render={this.renderOutgoingPullRequests}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={topic.upstreamTopicId}
        fetchAction={topics.actions.fetch}
        fetchedPropSelector={topics.selectors.getById}
      />
    );
  }
}

const OutgoingPullRequests = withNamespaces()(PureOutgoingPullRequests);

export { PureOutgoingPullRequests };
export default OutgoingPullRequests;
