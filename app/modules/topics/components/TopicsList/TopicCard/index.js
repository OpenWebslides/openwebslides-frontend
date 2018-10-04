// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Modal } from 'semantic-ui-react';

import { TOPIC_EDITOR_ROUTE, TOPIC_COURSE_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';

import actions from '../../../actions';
import * as m from '../../../model';
import selectors from '../../../selectors';

type PassedProps = {|
  topicId: string,
  isCurrentUser: boolean,
  onRemoveTopic: (topicId: string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps |};

type ComponentState = {|
  isRemoveModalOpen: boolean,
|};

class PureTopicCard extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    isRemoveModalOpen: false,
  };

  showRemoveModal = (): void => {
    this.setState({ isRemoveModalOpen: true });
  };

  removeModalSubmit = (): void => {
    const { topicId, onRemoveTopic } = this.props;
    onRemoveTopic(topicId);
    this.setState({ isRemoveModalOpen: false });
  };

  removeModalCancel = (): void => {
    this.setState({ isRemoveModalOpen: false });
  };

  renderRemoveModal = (topic: m.Topic): React.Node => {
    const { isRemoveModalOpen } = this.state;
    const { t } = this.props;

    return (
      <Modal
        size="mini"
        open={isRemoveModalOpen}
        onClose={this.removeModalCancel}
        data-test-id="topic-card-remove-modal"
      >
        <Modal.Header>{topic.title}</Modal.Header>
        <Modal.Content>
          <p>{t(`topics:modals.remove.message`)}</p>
          <p>{t(`common:undoWarning`)}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            icon={true}
            labelPosition="left"
            onClick={this.removeModalCancel}
            data-test-id="topic-card-remove-modal-cancel-button"
          >
            <Icon name="cancel" />
            {t(`common:button.cancel`)}
          </Button>
          <Button
            primary={true}
            icon={true}
            labelPosition="left"
            onClick={this.removeModalSubmit}
            data-test-id="topic-card-remove-modal-submit-button"
          >
            <Icon name="trash" />
            {t(`common:button.delete`)}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  renderTopicCardButtons = (topic: m.Topic): React.Node => {
    const { isCurrentUser } = this.props;

    return (isCurrentUser === false) ? null : (
      <Card.Content extra={true}>
        <div className="ui two buttons">
          <Button
            onClick={this.showRemoveModal}
            icon={true}
            data-test-id="topic-card-remove-button"
          >
            <Icon name="trash" />
          </Button>
          <Button
            primary={true}
            icon={true}
            as={Link}
            to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: topic.id })}
            data-test-id="topic-card-edit-button"
          >
            <Icon name="pencil" />
          </Button>
        </div>
      </Card.Content>
    );
  };

  renderTopicCard = (topic: m.Topic): React.Node => {
    const { t } = this.props;

    return (
      <React.Fragment>
        <Card data-test-id="topic-card">
          <Card.Content>
            <Card.Header>
              <Link to={makeRoute(TOPIC_COURSE_ROUTE, { topicId: topic.id })}>
                {topic.title}
              </Link>
            </Card.Header>
            <Card.Meta>TODO: creation date</Card.Meta>
            <Card.Description>
              {
                (topic.description != null)
                  ? <span data-test-id="topic-card-description">{topic.description}</span>
                  : <span data-test-id="topic-card-no-description">({t('topics:props.noDescription')})</span>
              }
            </Card.Description>
          </Card.Content>
          {this.renderTopicCardButtons(topic)}
        </Card>
        {this.renderRemoveModal(topic)}
      </React.Fragment>
    );
  };

  render(): React.Node {
    const { topicId } = this.props;
    return (
      <FetchWrapper
        render={this.renderTopicCard}
        renderPropsAndState={{ ...this.props, ...this.state }}
        fetchId={topicId}
        fetchAction={actions.fetch}
        fetchedPropSelector={selectors.getById}
      />
    );
  }
}

const TopicCard = translate()(PureTopicCard);

export { PureTopicCard };
export default TopicCard;
