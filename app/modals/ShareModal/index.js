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

type PassedTabProps = {|
  value: string,
|};

type TabProps = {| ...TranslatorProps, ...PassedTabProps |};

class PureCopyButton extends React.Component<TabProps> {
  handleOnCopy = (): void => {
    const { value } = this.props;

    copy(value);
  };

  render(): React.Node {
    const { t } = this.props;

    return (
      <Popup
        trigger={(
          <Button
            primary={true}
            icon="copy"
            onClick={this.handleOnCopy}
            data-test-id="share-modal-copy-button"
          />
        )}
        content={t('common:copied')}
        inverted={true}
        on="click"
        size="mini"
      />
    );
  }
}

const CopyButton = withNamespaces()(PureCopyButton);

const URLTab = (props: TabProps): React.Node => {
  const { value } = props;

  return (
    <Input
      icon="eye"
      iconPosition="left"
      fluid={true}
      readOnly={true}
      // onFocus={super.handleOnFocusSelect}
      value={value}
      action={<CopyButton value={value} />}
      data-test-id="share-modal-url-input"
    />
  );
};

const EmbedTab = (props: TabProps): React.Node => {
  const { value } = props;

  return (
    <Input
      icon="eye"
      iconPosition="left"
      fluid={true}
      readOnly={true}
      value={value}
      action={<CopyButton value={value} />}
      data-test-id="share-modal-embed-input"
    />
  );
};

const PureShareModal = (props: Props): React.Node => {
  const { t, isOpen, onCancel, topic } = props;

  const route = makeRoute(TOPIC_VIEWER_ROUTE, { topicId: topic.id }, true);
  const embed = `<iframe src="${route}"></iframe>`;

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
              render: () => <URLTab value={route} />,
            },
            { menuItem: { key: 'embed', content: t('modals:share.panes.embed'), icon: 'code' },
              render: () => <EmbedTab value={embed} />,
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
