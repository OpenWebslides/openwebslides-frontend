// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps, Trans } from 'react-i18next';
import { Modal, Tab, Icon, Divider, Button, Input, Popup } from 'semantic-ui-react';
import copy from 'copy-to-clipboard';

import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import makeRoute from 'lib/makeRoute';
import topics from 'modules/topics';

type PassedProps = {|
  topic: topics.model.Topic,
  isOpen: boolean,
  onCancel: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

class PureShareModal extends React.Component<Props> {
  route = (): string => {
    const { topic } = this.props;

    return makeRoute(TOPIC_VIEWER_ROUTE, { topicId: topic.id }, true);
  };

  handleOnFocusSelect = (e: SyntheticInputEvent<HTMLInputElement>) => e.target.select();

  handleOnCopy = () => copy(this.route());

  renderCopyButton = (): React.Node => {
    const { t } = this.props;

    return (
      <Popup
        trigger={(
          <Button
            primary={true}
            icon="copy"
            onClick={this.handleOnCopy}
            data-test-id="share-modal-url-input"
          />
        )}
        content={t('common:copied')}
        inverted={true}
        on="click"
        size="mini"
      />
    );
  };

  renderUrlTab = (): React.Node => {
    return (
      <Input
        icon="eye"
        iconPosition="left"
        fluid={true}
        readOnly={true}
        onFocus={this.handleOnFocusSelect}
        value={this.route()}
        action={this.renderCopyButton}
      />
    );
  };

  render(): React.Node {
    const { t, isOpen, onCancel, topic } = this.props;

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
                render: this.renderUrlTab,
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
  }
}

const ShareModal = withNamespaces()(PureShareModal);

export { PureShareModal };
export default ShareModal;
