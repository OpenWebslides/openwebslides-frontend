// @flow

import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'semantic-ui-react';

import CommitForm, { type CommitFormValues } from 'forms/CommitForm';

type PassedProps = {|
  isOpen: boolean,
  onSubmit: (values: CommitFormValues) => void,
  onCancel: () => void,
|};

type Props = {| ...PassedProps |};

const PureCommitModal = (props: Props): React.Node => {
  const { isOpen, onSubmit, onCancel } = props;
  const [t] = useTranslation();

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
        <CommitForm onSubmit={onSubmit} />
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

const CommitModal = PureCommitModal;

export { PureCommitModal };
export default CommitModal;
