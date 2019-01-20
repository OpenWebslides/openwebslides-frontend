// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Modal, Button, Icon } from 'semantic-ui-react';

import InlineMarkdown from 'components/InlineMarkdown';
import FeedbackForm, { type FeedbackFormValues } from 'forms/FeedbackForm';
import topics from 'modules/topics';

type PassedProps = {|
  sourceTopic: topics.model.Topic,
  targetTopic: topics.model.Topic,
  isOpen: boolean,
  onSubmit: (
    feedback: string,
    pullRequestId: string,
  ) => void,
  onCancel: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureAcceptPullRequestModal extends React.Component<Props> {
  handleFeedbackFormSubmit = (values: FeedbackFormValues): void => {
    const { onSubmit } = this.props;

    onSubmit(values.feedback);
  };

  render(): React.Node {
    const { t, isOpen, onCancel, source, target } = this.props;

    return (
      <Modal
        size="mini"
        basic={true}
        open={isOpen}
        onClose={onCancel}
        data-test-id="accept-pull-request-modal"
      >
        <Modal.Header>{t('modals:pullRequest.accept.title')}</Modal.Header>
        <Modal.Content>
          <p>
            <InlineMarkdown text={t('modals:pullRequest.accept.description', {
              sourceTopicTitle: source.title,
              targetTopicTitle: target.title,
            })}
            />
          </p>
          <p>
            <Icon name="lock" /> {t('modals:pullRequest.accept.access')}
          </p>
          <FeedbackForm
            onSubmit={this.handleFeedbackFormSubmit}
            required={false}
            data-test-id="accept-pull-request-modal-feedback-form"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted={true}
            onClick={onCancel}
            data-test-id="accept-pull-request-modal-cancel-button"
          >
            {t('common:button.cancel')}
          </Button>
          <Button
            type="submit"
            form="feedback-form"
            color="green"
            inverted={true}
            data-test-id="accept-pull-request-modal-submit-button"
          >
            {t('pullRequests:button.accept')}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const AcceptPullRequestModal = withNamespaces()(PureAcceptPullRequestModal);

export { PureAcceptPullRequestModal };
export default AcceptPullRequestModal;
