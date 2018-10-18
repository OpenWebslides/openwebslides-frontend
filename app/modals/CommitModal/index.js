// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Modal, Button } from 'semantic-ui-react';

import CommitForm from 'forms/CommitForm';

type PassedProps = {|
  isOpen: boolean,
  onSubmit: () => void,
  onCancel: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const PureCommitModal = (props: Props): React.Node => {
  const { t, isOpen, onSubmit, onCancel } = props;

  return (
    <Modal
      size="mini"
      basic={true}
      open={isOpen}
      onClose={onCancel}
    >
      <Modal.Header>{t('modals:commit.title')}</Modal.Header>
      <Modal.Content>
        <p>{t('modals:commit.message')}</p>
        <CommitForm
          onSubmit={onSubmit}
          data-test-id="commit-modal-commit-form"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          inverted={true}
          onClick={onCancel}
          data-test-id="commit-modal-cancel-button"
        >
          {t('common:button.cancel')}
        </Button>
        <Button
          type="submit"
          form="commit-form"
          color="green"
          inverted={true}
          data-test-id="commit-modal-submit-button"
        >
          {t('common:button.save')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const CommitModal = withNamespaces()(PureCommitModal);

export { PureCommitModal };
export default CommitModal;