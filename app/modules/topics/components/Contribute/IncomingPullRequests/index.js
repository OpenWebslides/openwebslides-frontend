// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Item, Icon, Header, Divider } from 'semantic-ui-react';

import pullRequests from 'modules/pullRequests';

import * as m from '../../../model';

type PassedProps = {|
  topic: m.Topic,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const { PullRequest } = pullRequests.components;

class PureIncomingPullRequests extends React.Component<Props> {
  renderPullRequest = (pullRequestId: string): React.Node => {
    return (
      <Item key={pullRequestId}>
        <Item.Content>
          <PullRequest pullRequestId={pullRequestId} />
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
