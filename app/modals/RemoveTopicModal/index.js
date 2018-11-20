// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Modal, Button } from 'semantic-ui-react';

import topics from 'modules/topics';

type PassedProps = {|
  topic: topics.model.Topic,
  isOpen: boolean,
  onSubmit: () => void,
  onCancel: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureRemoveTopicModal = (props: Props): React.Node => {
  const { t, topic, isOpen, onSubmit, onCancel } = props;

  return (
    <Modal
      size="mini"
      basic={true}
      open={isOpen}
      onClose={onCancel}
      data-test-id="remove-topic-modal"
    >
      <Modal.Header>{topic.title}</Modal.Header>
      <Modal.Content data-test-id="remove-topic-modal-content">
        <p>{t('modals:removeTopic.message')}</p>
        <p>{t('common:undoWarning')}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          inverted={true}
          onClick={onCancel}
          data-test-id="remove-topic-modal-cancel-button"
        >
          {t('common:button.cancel')}
        </Button>
        <Button
          color="red"
          inverted={true}
          onClick={onSubmit}
          data-test-id="remove-topic-modal-submit-button"
        >
          {t('common:button.delete')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const RemoveTopicModal = withNamespaces()(PureRemoveTopicModal);

export { PureRemoveTopicModal };
export default RemoveTopicModal;
