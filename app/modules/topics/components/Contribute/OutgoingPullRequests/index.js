// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Item, Icon, Header } from 'semantic-ui-react';

import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';
import pullRequests from 'modules/pullRequests';

import actions from '../../../actions';
import * as m from '../../../model';
import selectors from '../../../selectors';

type PassedProps = {|
  topic: m.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const { PullRequest } = pullRequests.components;

class PureOutgoingPullRequests extends React.Component<Props> {
  renderPullRequest = (pullRequestId: string): React.Node => {
    return (
      <Item key={pullRequestId}>
        <Item.Content>
          <PullRequest pullRequestId={pullRequestId} />
        </Item.Content>
      </Item>
    );
  };

  renderOutgoingPullRequests = (upstreamTopic: m.Topic): React.Node => {
    const { t, topic } = this.props;

    return (
      <div data-test-id="outgoing-pull-requests">
        <Header as="h3">
          <Icon name="refresh" />
          {t('topics:sidebars.contribute.outgoing.title')}
        </Header>
        <Item.Group>
          <Item>
            <Item.Content>

            </Item.Content>
          </Item>
          {(topic.outgoingPullRequestIds.length === 0 ? (
            <Item>
              <Item.Content>
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
              </Item.Content>
            </Item>
          ) : null)}
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
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const OutgoingPullRequests = withNamespaces()(PureOutgoingPullRequests);

export { PureOutgoingPullRequests };
export default OutgoingPullRequests;
