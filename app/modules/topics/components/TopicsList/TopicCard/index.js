// @flow

import * as React from 'react';
import { Translation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Icon } from 'semantic-ui-react';
import moment from 'moment';

import { type TFunction } from 'types/i18next';
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

type Props = {| ...PassedProps |};

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
      <Translation>
        {(t: TFunction): React.Node => (
          <Card.Content extra={true}>
            <Button.Group className={`ui ${isCurrentUser === true ? 'three' : 'two'} buttons`} inverted={true}>
              <Button
                primary={true}
                icon={true}
                as={Link}
                to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: topic.id })}
                data-test-id="topic-card-view-button"
              >
                <Icon name="eye" />
              </Button>
              {(isCurrentUser !== false) ? (
                <>
                  <Button
                    icon={true}
                    basic={true}
                    as={Link}
                    to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: topic.id })}
                    data-test-id="topic-card-edit-button"
                  >
                    <Icon name="pencil" />
                  </Button>
                  <Button
                    onClick={this.showRemoveModal}
                    className="link"
                    data-test-id="topic-card-remove-button"
                  >
                    {t('common:button.delete')}
                  </Button>

                </>
              ) : null }
            </Button.Group>
          </Card.Content>
        )}
      </Translation>
    );
  };

  renderTopicCard = (topic: m.Topic): React.Node => {
    const { isRemoveModalOpen } = this.state;

    return (
      <Translation>
        {(t: TFunction): React.Node => (
          <>
            <Card data-test-id="topic-card">
              <Card.Content>
                <Card.Header>
                  <Link to={makeRoute(TOPIC_VIEWER_ROUTE, { topicId: topic.id })}>
                    {topic.title}
                  </Link>
                </Card.Header>
                <Card.Meta title={moment(alert.timestamp).format('LLLL')}>
                  {t('topics:props.timestamp', { timestamp: moment(topic.timestamp).fromNow() })}
                </Card.Meta>
                <Card.Description>
                  {
                    (topic.description != null)
                      ? <span data-test-id="topic-card-description">{topic.description}</span>
                      : <em data-test-id="topic-card-no-description">{t('topics:props.noDescription')}</em>
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
        )}
      </Translation>
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

const TopicCard = PureTopicCard;

export { PureTopicCard };
export default TopicCard;
