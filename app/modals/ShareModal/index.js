// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Modal, Tab, Icon, Divider, Button, Input } from 'semantic-ui-react';

import topics from 'modules/topics';

type PassedProps = {|
  topic: topics.model.Topic,
  isOpen: boolean,
  onCancel: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

const handleOnFocusSelect = (e: SyntheticInputEvent<HTMLInputElement>) => e.target.select();

const renderUrlTab = (): React.Node => (
  <Input
    icon="eye"
    iconPosition="left"
    fluid={true}
    readOnly={true}
    onFocus={handleOnFocusSelect}
    value="https://openwebslid.es/topic/1/viewer" /* TODO: replace with actual link */
    action={{ primary: true, icon: 'copy' }}
    data-test-id="share-modal-url-input"
  />
);

const PureShareModal = (props: Props): React.Node => {
  const { t, isOpen, onCancel, topic } = props;

  return (
    <Modal
      size="mini"
      basic={true}
      open={isOpen}
      onClose={onCancel}
    >
      <Modal.Header>{t('modals:share.title')}</Modal.Header>
      <Modal.Content>
        <Icon name="lock" />
        <Trans i18nKey={`modals:share.accessMessageForType.${topic.access}`}>
          <strong>access</strong>
        </Trans>

        <Divider hidden={true} />

        <Tab
          menu={{ secondary: true, inverted: true }}
          panes={[
            { menuItem: { key: 'url', content: t('modals:share.panes.url'), icon: 'linkify' },
              render: renderUrlTab,
            },
            { menuItem: { key: 'embed', content: t('modals:share.panes.embed'), icon: 'code' },
              render: (): React.Node => {
                return <p>embed</p>;
              },
            },
          ]}
          data-test-id="share-modal-tabs"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          inverted={true}
          onClick={onCancel}
          data-test-id="share-modal-close-button"
        >
          {t('common:button.close')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

const ShareModal = withNamespaces()(PureShareModal);

export { PureShareModal };
export default ShareModal;
