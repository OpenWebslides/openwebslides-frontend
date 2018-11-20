// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';

import { TOPIC_EDITOR_ROUTE, TOPIC_VIEWER_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';
import RemoveTopicModal from 'modals/RemoveTopicModal';

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

  handleRemoveModalSubmit = (): void => {
    const { topicId, onRemoveTopic } = this.props;
    onRemoveTopic(topicId);
    this.setState({ isRemoveModalOpen: false });
  };

  handleRemoveModalCancel = (): void => {
    this.setState({ isRemoveModalOpen: false });
  };

  renderTopicCardButtons = (topic: m.Topic): React.Node => {
    const { isCurrentUser } = this.props;

    return (
      <Card.Content extra={true}>
        <div className={`ui ${isCurrentUser === true ? 'three' : 'two'} buttons`}>
          {(isCurrentUser !== false) ? (
            <>
              <Button
                onClick={this.showRemoveModal}
                icon={true}
                data-test-id="topic-card-remove-button"
              >
                <Icon name="trash" />
              </Button>
              <Button
                icon={true}
                as={Link}
                to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: topic.id })}
                data-test-id="topic-card-edit-button"
              >
                <Icon name="pencil" />
              </Button>
            </>
          ) : null }

          <Button
            primary={true}
            icon={true}
            as={Link}
            to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: topic.id })}
            data-test-id="topic-card-view-button"
          >
            <Icon name="eye" />
          </Button>
        </div>
      </Card.Content>
    );
  };

  renderTopicCard = (topic: m.Topic): React.Node => {
    const { t } = this.props;
    const { isRemoveModalOpen } = this.state;

    return (
      <>
        <Card data-test-id="topic-card">
          <Card.Content>
            <Card.Header>
              <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: topic.id })}>
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

        <RemoveTopicModal
          topic={topic}
          isOpen={isRemoveModalOpen}
          onSubmit={this.handleRemoveModalSubmit}
          onCancel={this.handleRemoveModalCancel}
        />
      </>
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

const TopicCard = withNamespaces()(PureTopicCard);

export { PureTopicCard };
export default TopicCard;
