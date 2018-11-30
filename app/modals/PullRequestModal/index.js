// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Modal, Button } from 'semantic-ui-react';

import { type ModulesAction, type AppState } from 'types/redux';
import InlineMarkdown from 'components/InlineMarkdown';
import PullRequestForm, { type PullRequestFormValues } from 'forms/PullRequestForm';
import topics from 'modules/topics';
import platform from 'modules/platform';

type PassedProps = {|
  sourceTopicId: string,
  targetTopicId: string,
  isOpen: boolean,
  onSubmit: (
    message: string,
    sourceTopicId: string,
    targetTopicId: string,
    currentUserId: string,
  ) => void,
  onCancel: () => void,
|};

type StateProps = {|
  sourceTopic: ?topics.model.Topic,
  targetTopic: ?topics.model.Topic,
  currentUserId: ?string,
|};

type DispatchProps = {|
  fetchTopic: (topicId: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

const mapStateToProps = (state: AppState, props: PassedProps): StateProps => {
  const { sourceTopicId, targetTopicId } = props;
  const userAuth = platform.selectors.getUserAuth(state);

  return {
    sourceTopic: topics.selectors.getById(state, { id: sourceTopicId }),
    targetTopic: topics.selectors.getById(state, { id: targetTopicId }),
    currentUserId: (userAuth != null) ? userAuth.userId : null,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
  props: PassedProps,
): DispatchProps => {
  return {
    fetchTopic: (topicId: string): void => {
      dispatch(topics.actions.fetch(topicId));
    },
  };
};

class PurePullRequestModal extends React.Component<Props> {
  componentDidMount = (): void => {
    const { sourceTopicId, targetTopicId, sourceTopic, targetTopic, fetchTopic } = this.props;
    if (sourceTopic == null) fetchTopic(sourceTopicId);
    if (targetTopic == null) fetchTopic(targetTopicId);
  };

  handlePullRequestFormSubmit = (values: PullRequestFormValues): void => {
    const { onSubmit, sourceTopicId, targetTopicId, currentUserId } = this.props;

    onSubmit(values.message, sourceTopicId, targetTopicId, currentUserId);
  };

  render(): React.Node {
    const { t, isOpen, onCancel, sourceTopic, targetTopic, currentUserId } = this.props;

    if (sourceTopic == null || targetTopic == null || currentUserId == null) {
      return null;
    }

    return (
      <Modal
        size="mini"
        basic={true}
        open={isOpen}
        onClose={onCancel}
        data-test-id="pull-request-modal"
      >
        <Modal.Header>{t('modals:pullRequest.title')}</Modal.Header>
        <Modal.Content>
          <p>
            <InlineMarkdown text={t('modals:pullRequest.description', { topicTitle: sourceTopic.title })} />
          </p>
          <p>
            From: <strong>{sourceTopic.title}</strong>
          </p>
          <p>
            To: <strong>{targetTopic.title}</strong>
          </p>
          <PullRequestForm
            onSubmit={this.handlePullRequestFormSubmit}
            data-test-id="pull-request-modal-pull-request-form"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted={true}
            onClick={onCancel}
            data-test-id="pull-request-modal-cancel-button"
          >
            {t('common:button.cancel')}
          </Button>
          <Button
            type="submit"
            form="pull-request-form"
            color="red"
            inverted={true}
            data-test-id="pull-request-modal-submit-button"
          >
            {t('pullRequests:button.submit')}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const PullRequestModal = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withNamespaces()(PurePullRequestModal));

export { PurePullRequestModal };
export default PullRequestModal;
