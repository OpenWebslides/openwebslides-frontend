// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { connect } from 'react-redux';
import { Prompt } from 'react-router-dom';
import { type Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { Button, Icon, Menu, Divider, Segment } from 'semantic-ui-react';

import { type TFunction } from 'types/i18next';
import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import { type AppState, type ModulesAction } from 'types/redux';
import makeRoute from 'lib/makeRoute';
import FetchWrapper from 'components/FetchWrapper';
import { type CommitFormValues } from 'forms/CommitForm';
import CommitModal from 'modals/CommitModal';
import ShareModal from 'modals/ShareModal';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as m from '../../model';
import selectors from '../../selectors';

import Metadata from './Metadata';

type PassedProps = {|
  topicId: string,
|};

type StateProps = {|
  topic: ?m.Topic,
|};

type DispatchProps = {|
  onCommit: (values: CommitFormValues) => void,
  onSetDirty: (dirty: boolean) => void,
  onDiscard: () => void,
  onView: () => void,
|};

type Props = {| ...PassedProps, ...StateProps, ...DispatchProps |};

type ComponentState = {|
  isCommitModalOpen: boolean,
  isShareModalOpen: boolean,
|};

const { EditableDisplay: ContentItemEditableDisplay } = contentItems.components;

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { topicId } = props;

  return {
    topic: selectors.getById(state, { id: topicId }),
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  const { topicId } = props;

  return {
    onCommit: (values: CommitFormValues): void => {
      dispatch(actions.patchWithContent(topicId, values.message));
    },
    onSetDirty: (dirty: boolean): void => {
      dispatch(actions.setDirtyInState(topicId, dirty));
    },
    onDiscard: (): void => {
      dispatch(actions.discard(topicId));
    },
    onView: (): void => {
      dispatch(push(makeRoute(TOPIC_VIEWER_ROUTE, { topicId })));
    },
  };
};

class PureEditor extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    isCommitModalOpen: false,
    isShareModalOpen: false,
  };

  componentDidMount(): void {
    // Add event listener to prevent unloading window when topic is dirty
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  componentWillUnmount(): void {
    const { topic, onDiscard } = this.props;

    // discard topic when exiting editor
    if (topic != null && topic.isDirty) onDiscard();

    // Remove event listener to prevent unloading window when topic is dirty
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  showCommitModal = (): void => {
    this.setState({ isCommitModalOpen: true });
  };

  showShareModal = (): void => {
    this.setState({ isShareModalOpen: true });
  };

  handleCommitModalSubmit = (values: CommitFormValues): void => {
    const { onCommit } = this.props;
    onCommit(values);
    this.setState({ isCommitModalOpen: false });
  };

  handleCommitModalCancel = (): void => {
    this.setState({ isCommitModalOpen: false });
  };

  hideShareModal = (): void => {
    this.setState({ isShareModalOpen: false });
  };

  showViewer = (): void => {
    const { onView } = this.props;
    onView();
  };

  beforeUnloadHandler = (event: Event): void => {
    const { topic } = this.props;

    if (topic != null && topic.isDirty) {
      // Cancel the event as stated by the standard
      event.preventDefault();

      // Chrome requires returnValue to be set
      /* eslint-disable no-param-reassign */
      // $FlowFixMe flowtype for Event does not contain the `returnValue` property
      event.returnValue = '';
      /* eslint-enable */
    }
  };

  fetchCondition = (topic: ?m.Topic): boolean => {
    return (topic == null || !topic.isContentFetched);
  };

  renderEditor = (topic: m.Topic): React.Node => {
    const { onSetDirty } = this.props;
    const { isCommitModalOpen, isShareModalOpen } = this.state;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <div data-test-id="topic-editor">
            {/* Prompt when user navigates away from the page with unsaved changes */}
            <Prompt
              when={topic.isDirty}
              message={t('topics:modals.unsavedChanges.message')}
            />

            <Menu secondary={true}>
              <Menu.Menu position="right">
                <Menu.Item>
                  <Button
                    basic={true}
                    onClick={this.showViewer}
                    data-test-id="topic-editor-view-button"
                  >
                    <Icon name="eye" />
                    {t('common:button.view')}
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    basic={true}
                    onClick={this.showShareModal}
                    data-test-id="topic-editor-share-button"
                  >
                    <Icon name="share alternate" />
                    {t('common:button.share')}
                  </Button>
                </Menu.Item>
                <Menu.Item>
                  <Button
                    disabled={!topic.isDirty}
                    primary={true}
                    onClick={this.showCommitModal}
                    data-test-id="topic-editor-commit-button"
                  >
                    <Icon name="save" />
                    {t('common:button.save')}
                  </Button>
                </Menu.Item>
              </Menu.Menu>
            </Menu>

            <Segment padded={true}>
              <Metadata topic={topic} />
            </Segment>

            <Divider hidden={true} />

            <ContentItemEditableDisplay
              contentItemId={topic.rootContentItemId}
              setTopicDirty={onSetDirty}
            />

            <CommitModal
              isOpen={isCommitModalOpen}
              onSubmit={this.handleCommitModalSubmit}
              onCancel={this.handleCommitModalCancel}
            />

            <ShareModal
              topic={topic}
              isOpen={isShareModalOpen}
              onCancel={this.hideShareModal}
            />
          </div>
        )}
      </Translation>
    );
  };

  render(): React.Node {
    const { topicId } = this.props;

    return (
      <FetchWrapper
        render={this.renderEditor}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={topicId}
        fetchAction={actions.fetchWithContent}
        fetchedPropSelector={selectors.getById}
        fetchCondition={this.fetchCondition}
      />
    );
  }
}

const Editor = connect(mapStateToProps, mapDispatchToProps)(PureEditor);

export { PureEditor };
export default Editor;
