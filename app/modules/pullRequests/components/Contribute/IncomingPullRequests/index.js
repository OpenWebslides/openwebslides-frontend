// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Item, Icon, Header, Divider } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import topics from 'modules/topics';

import PullRequestEntry from '../../PullRequestEntry';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type Props = {| ...PassedProps |};

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
    const { topic } = this.props;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
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
              <Icon name="sign-in alternate" />
              {t('topics:sidebars.contribute.incoming.title')}
            </Header>
            <Item.Group>
              <Item>
                <Item.Content>
                  {topic.incomingPullRequestIds.length === 0 ? (
                    <em data-test-id="incoming-pull-requests-empty-message">
                      {t('topics:sidebars.contribute.incoming.empty')}
                    </em>
                  ) : (
                    <p data-test-id="incoming-pull-requests-message">{t('topics:sidebars.contribute.incoming.message')}</p>
                  )}
                </Item.Content>
              </Item>

              {(topic.incomingPullRequestIds.map((id) => this.renderPullRequest(id)))}
            </Item.Group>
          </div>
        )}
      </Translation>
    );
  }
}

const IncomingPullRequests = PureIncomingPullRequests;

export { PureIncomingPullRequests };
export default IncomingPullRequests;
