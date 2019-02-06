// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { Header, Menu, Icon, Button } from 'semantic-ui-react';

import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import { type AppState, type ModulesAction } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import FetchWrapper from 'components/FetchWrapper';
import ShareModal from 'modals/ShareModal';
import platform from 'modules/platform';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';
import Course from '../Course';
import ForkInfo from '../ForkInfo';

type PassedProps = {|
  topicId: string,
  onForkTopic: (topicId: string) => void,
|};

type StateProps = {|
  topic: ?m.Topic,
  currentUserId: ?string,
|};

type DispatchProps = {|
  onEdit: () => void,
|};

type ComponentState = {|
  isShareModalOpen: boolean,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { topicId } = props;

  const userAuth = platform.selectors.getUserAuth(state);

  return {
    topic: selectors.getById(state, { id: topicId }),
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { topicId } = props;

  return {
    onEdit: (): void => {
      dispatch(push(makeRoute(TOPIC_EDITOR_ROUTE, { topicId })));
    },
  };
};

class PureViewer extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    isShareModalOpen: false,
  };

  showShareModal = (): void => {
    this.setState({ isShareModalOpen: true });
  };

  hideShareModal = (): void => {
    this.setState({ isShareModalOpen: false });
  };

  handleForkButtonClick = (): void => {
    const { onForkTopic, topicId } = this.props;
    onForkTopic(topicId);
  };

  showEditor = (): void => {
    const { onEdit } = this.props;
    onEdit();
  };

  fetchCondition = (topic: ?m.Topic): boolean => {
    return (topic == null || !topic.isContentFetched);
  };

  renderViewer = (topic: m.Topic): React.Node => {
    const { t, currentUserId } = this.props;
    const { isShareModalOpen } = this.state;

    return (
      <div data-test-id="topic-viewer">

        <Menu secondary={true}>
          <Menu.Menu position="right">
            {/* TODO: importing policies renders a cyclic dependency */}
            <Menu.Item>
              <Button
                basic={true}
                onClick={this.showEditor}
                disabled={(
                  topic.userId !== currentUserId
                  && !topic.collaboratorUserIds.includes(currentUserId)
                )}
                data-test-id="topic-viewer-edit-button"
              >
                <Icon name="pencil" />
                {t('common:button.edit')}
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                basic={true}
                onClick={this.showShareModal}
                data-test-id="topic-viewer-share-button"
              >
                <Icon name="share alternate" />
                {t('common:button.share')}
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button
                disabled={currentUserId == null || topic.upstreamTopicId != null}
                basic={true}
                onClick={this.handleForkButtonClick}
                data-test-id="topic-viewer-fork-button"
              >
                <Icon name="fork" />
                {t('common:button.fork')}
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        <Header as="h1">
          {topic.title}
          <Header.Subheader>
            {topic.description == null || topic.description === '' ? (
              <p data-test-id="topic-viewer-no-description"><em>{t('topics:props.noDescription')}</em></p>
            )
              : <p data-test-id="topic-viewer-description">{topic.description}</p>
            }
            {(topic.upstreamTopicId !== null ? (
              <small>
                <ForkInfo upstreamTopicId={topic.upstreamTopicId} />
              </small>
            ) : null)}
          </Header.Subheader>
        </Header>

        <Course topic={topic} />

        <ShareModal
          topic={topic}
          isOpen={isShareModalOpen}
          onCancel={this.hideShareModal}
        />
      </div>
    );
  };

  render(): React.Node {
    const { topicId } = this.props;

    return (
      <FetchWrapper
        render={this.renderViewer}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={topicId}
        fetchAction={actions.fetchWithContent}
        fetchedPropSelector={selectors.getById}
        fetchCondition={this.fetchCondition}
      />
    );
  }
}

const Viewer = connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(PureViewer));

export { PureViewer };
export default Viewer;
