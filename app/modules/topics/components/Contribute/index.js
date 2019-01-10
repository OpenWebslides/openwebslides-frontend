// @flow

import * as React from 'react';
import { type Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Item, Icon, Button, Message, Header, Divider } from 'semantic-ui-react';

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

class PureContribute extends React.Component<Props, ComponentState> {
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

  renderContribute = (upstreamTopic: m.Topic): React.Node => {
    const { t, topic } = this.props;
    const { isPRModalOpen } = this.state;

    return (
      <div data-test-id="contribute">
        <Item.Group>
          <Item>
            <Item.Content>
              <p>
                <Trans
                  i18nKey="topics:sidebars.contribute.info"
                  values={{ upstreamTopicTitle: upstreamTopic.title }}
                >
                  <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: upstreamTopic.id })}>
                    title
                  </Link>
                </Trans>
              </p>
              {/* TODO: commit count */}
              <p><strong>{t('topics:sidebars.contribute.count', { count: 0 })}</strong></p>
            </Item.Content>
          </Item>
          <Item>
            <Item.Content>
              {(topic.isDirty ? (
                <Message
                  warning={true}
                  icon="exclamation"
                  content={t('topics:sidebars.contribute.saveChanges')}
                  data-test-id="contribute-dirty-message"
                />
              ) : null)}
              <Button
                disabled={topic.isDirty}
                secondary={true}
                fluid={true}
                onClick={this.showPRModal}
                data-test-id="contribute-pull-request-button"
              >
                <Icon name="send" />
                {t('common:button.pr')}
              </Button>
            </Item.Content>
          </Item>
        </Item.Group>

        <Divider hidden={true} />

        <Header as="h3">
          <Icon name="refresh" />
          {t('topics:sidebars.contribute.pending.title')}
        </Header>
        <Item.Group>
          <Item>
            <Item.Content>
              <em>{t('topics:sidebars.contribute.pending.empty')}</em>
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
        render={this.renderContribute}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={topic.upstreamTopicId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const Contribute = connect(null, mapDispatchToProps)(withNamespaces()(PureContribute));

export { PureContribute };
export default Contribute;
