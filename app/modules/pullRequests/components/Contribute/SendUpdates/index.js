// @flow

import * as React from 'react';
import { type Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Translation, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Item, Icon, Button, Message } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import { type ModulesAction } from 'types/redux';
import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';
import PullRequestModal from 'modals/PullRequestModal';
import topics from 'modules/topics';

import actions from '../../../actions';

type PassedProps = {|
  topic: topics.model.Topic,
|};

type DispatchProps = {|
  onCreatePullRequest: (
    message: string,
    sourceTopicId: string,
    targetTopicId: string,
    currentUserId: string,
  ) => void,
|};

type Props = {| ...PassedProps, ...DispatchProps |};

type ComponentState = {|
  isPRModalOpen: boolean,
|};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  return {
    onCreatePullRequest: (
      message: string,
      sourceTopicId: string,
      targetTopicId: string,
      currentUserId: string,
    ): void => {
      dispatch(actions.create(message, sourceTopicId, targetTopicId, currentUserId));
    },
  };
};

class PureSendUpdates extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    isPRModalOpen: false,
  };

  showPRModal = (): void => {
    this.setState({ isPRModalOpen: true });
  };

  handlePRModalSubmit = (
    message: string,
    sourceTopicId: string,
    targetTopicId: string,
    currentUserId: string,
  ): void => {
    const { onCreatePullRequest } = this.props;
    onCreatePullRequest(message, sourceTopicId, targetTopicId, currentUserId);
    this.setState({ isPRModalOpen: false });
  };

  handlePRModalCancel = (): void => {
    this.setState({ isPRModalOpen: false });
  };

  renderSendUpdates = (upstreamTopic: topics.model.Topic): React.Node => {
    const { topic } = this.props;
    const { isPRModalOpen } = this.state;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <div data-test-id="send-updates">
            <Item.Group>
              <Item>
                <Item.Content>
                  <p>
                    <Trans
                      i18nKey="topics:sidebars.contribute.sendUpdates.info"
                      values={{ upstreamTopicTitle: upstreamTopic.title }}
                    >
                      <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: upstreamTopic.id })}>
                        title
                      </Link>
                    </Trans>
                  </p>
                  {/* TODO: commit count */}
                  {/* <p><strong>{t('topics:sidebars.contribute.sendUpdates.count',
              { count: 0 })}</strong></p> */}
                </Item.Content>
              </Item>
              <Item>
                <Item.Content>
                  {(topic.isDirty ? (
                    <Message
                      warning={true}
                      icon="exclamation"
                      content={t('topics:sidebars.contribute.sendUpdates.saveChanges')}
                      data-test-id="send-updates-dirty-message"
                    />
                  ) : null)}
                  {(topic.hasOpenPullRequest ? (
                    <Message
                      warning={true}
                      icon="exclamation triangle"
                      content={t('topics:sidebars.contribute.sendUpdates.pullRequestOpen')}
                      data-test-id="send-updates-pull-request-open-message"
                    />
                  ) : null)}
                  <Button
                    disabled={topic.isDirty || topic.hasOpenPullRequest}
                    secondary={true}
                    fluid={true}
                    onClick={this.showPRModal}
                    data-test-id="send-updates-pull-request-button"
                  >
                    <Icon name="send" />
                    {t('common:button.pr')}
                  </Button>
                </Item.Content>
              </Item>
            </Item.Group>

            <PullRequestModal
              sourceTopicId={topic.id}
              targetTopicId={topic.upstreamTopicId}
              isOpen={isPRModalOpen}
              onSubmit={this.handlePRModalSubmit}
              onCancel={this.handlePRModalCancel}
            />
          </div>
        )}
      </Translation>
    );
  };

  render(): React.Node {
    const { topic } = this.props;

    return (
      <FetchWrapper
        render={this.renderSendUpdates}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={topic.upstreamTopicId}
        fetchAction={topics.actions.fetch}
        fetchedPropSelector={topics.selectors.getById}
      />
    );
  }
}

const SendUpdates = connect(null, mapDispatchToProps)(PureSendUpdates);

export { PureSendUpdates };
export default SendUpdates;
