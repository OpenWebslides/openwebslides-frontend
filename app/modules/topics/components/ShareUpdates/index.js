// @flow

import * as React from 'react';
import { type Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces, type TranslatorProps, Interpolate } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Item, Icon, Button, Message, Header } from 'semantic-ui-react';

import { type ModulesAction } from 'types/redux';
import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';
import PullRequestModal from 'modals/PullRequestModal';
import pullRequests from 'modules/pullRequests';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

type PassedProps = {|
  topic: m.Topic,
|};

type DispatchProps = {|
  onCreatePullRequest: (
    message: string,
    sourceTopicId: string,
    targetTopicId: string,
    currentUserId: string,
  ) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

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
      dispatch(pullRequests.actions.create(message, sourceTopicId, targetTopicId, currentUserId));
    },
  };
};

class PureShareUpdates extends React.Component<Props, ComponentState> {
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

  renderShareUpdates = (upstreamTopic: m.Topic): React.Node => {
    const { t, topic } = this.props;
    const { isPRModalOpen } = this.state;

    return (
      <div data-test-id="share-updates">
        <Item.Group>
          <Item>
            <Item.Content>
              <p>
                <Interpolate
                  i18nKey="topics:sidebars.shareUpdates.info"
                  upstreamTopicTitle={(
                    <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: upstreamTopic.id })}>
                      {upstreamTopic.title}
                    </Link>
                  )}
                />
              </p>
              {/* TODO: commit count */}
              <p><strong>{t('topics:sidebars.shareUpdates.count', { count: 0 })}</strong></p>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              {(topic.isDirty ? (
                <Message
                  warning={true}
                  icon="exclamation"
                  content={t('topics:sidebars.shareUpdates.saveChanges')}
                  data-test-id="share-updates-dirty-message"
                />
              ) : null)}
              <Button
                disabled={topic.isDirty}
                secondary={true}
                fluid={true}
                onClick={this.showPRModal}
                data-test-id="share-updates-pull-request-button"
              >
                <Icon name="tasks" />
                {t('common:button.pr')}
              </Button>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>

            </Item.Content>
          </Item>
        </Item.Group>

        <Header as="h3">
          <Icon name="refresh" />
          {t('topics:sidebars.shareUpdates.pendingRequests.title')}
        </Header>
        <Item.Group>
          <Item>
            <Item.Content>
              <em>{t('topics:sidebars.shareUpdates.pendingRequests.empty')}</em>
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
    );
  };

  render(): React.Node {
    const { topic } = this.props;

    return (
      <FetchWrapper
        render={this.renderShareUpdates}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={topic.upstreamTopicId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const ShareUpdates = connect(null, mapDispatchToProps)(withNamespaces()(PureShareUpdates));

export { PureShareUpdates };
export default ShareUpdates;
