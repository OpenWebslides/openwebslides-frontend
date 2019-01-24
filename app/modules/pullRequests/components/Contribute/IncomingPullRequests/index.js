// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Item, Icon, Header, Divider } from 'semantic-ui-react';

import topics from 'modules/topics';

import PullRequestEntry from '../../PullRequestEntry';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureIncomingPullRequests extends React.Component<Props> {
  renderPullRequest = (pullRequestId: string): React.Node => {
    return (
      <Item key={pullRequestId}>
        <Item.Content>
          <PullRequestEntry pullRequestId={pullRequestId} />
        </Item.Content>
      </Item>
    );
  };

  render(): React.Node {
    const { t, topic } = this.props;

    return (
      <div data-test-id="incoming-pull-requests">
        <Item.Group>
          <Item>
            <Item.Content>
              {t('topics:sidebars.contribute.incoming.description')}
            </Item.Content>
          </Item>
        </Item.Group>

        <Divider hidden={true} />

        <Header as="h3">
          <Icon name="refresh" />
          {t('topics:sidebars.contribute.incoming.title')}
        </Header>
        <Item.Group>
          <Item>
            <Item.Content>

            </Item.Content>
          </Item>
          {(topic.incomingPullRequestIds.length === 0 ? (
            <Item>
              <Item.Content>
                <em data-test-id="incoming-pull-requests-empty-message">
                  {t('topics:sidebars.contribute.incoming.empty')}
                </em>
              </Item.Content>
            </Item>
          ) : null)}
          {(topic.incomingPullRequestIds.map((id) => this.renderPullRequest(id)))}
        </Item.Group>
      </div>
    );
  }
}

const IncomingPullRequests = withNamespaces()(PureIncomingPullRequests);

export { PureIncomingPullRequests };
export default IncomingPullRequests;
