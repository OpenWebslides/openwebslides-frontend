// @flow

import * as React from 'react';
import { translate, type TranslatorProps } from 'react-i18next';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { type Dispatch } from 'redux';
import { Card, Button, Modal, Icon } from 'semantic-ui-react';

import { type Action } from 'types/action';
import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import FetchWrapper from 'components/FetchWrapper';
import makeRoute from 'lib/makeRoute';

import actions from '../../../actions';
import * as m from '../../../model';
import selectors from '../../../selectors';

type PassedProps = {|
  topicId: string,
|};

type DispatchProps = {|
  onRemove: () => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...DispatchProps |};

type ComponentState = {|
  isRemoveModalOpen: boolean,
|};

const mapDispatchToProps = (dispatch: Dispatch<Action>, props: PassedProps): DispatchProps => {
  const { topicId } = props;

  return {
    onRemove: (): void => {
      dispatch(actions.remove(topicId));
    },
  };
};

class PureTopicCard extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    isRemoveModalOpen: false,
  };

  showRemoveModal = (): void => {
    this.setState({ isRemoveModalOpen: true });
  };

  removeModalSubmit = (): void => {
    const { onRemove } = this.props;
    onRemove();
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
            primary={true}
            icon={true}
            labelPosition="left"
            onClick={this.removeModalSubmit}
            data-test-id="topic-card-remove-modal-submit-button"
          >
            <Icon name="trash" />
            {t(`common:button.delete`)}
          </Button>
          <Button
            icon={true}
            labelPosition="left"
            onClick={this.removeModalCancel}
            data-test-id="topic-card-remove-modal-cancel-button"
          >
            <Icon name="cancel" />
            {t(`common:button.cancel`)}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  };

  renderTopicCard = (topic: m.Topic): React.Node => {
    const { t } = this.props;

    return (
      <React.Fragment>
        <Card data-test-id="topic-card">
          <Card.Content>
            <Card.Header>{topic.title}</Card.Header>
            <Card.Meta>TODO: creation date</Card.Meta>
            <Card.Description>
              {
                (topic.description != null)
                  ? <span data-test-id="topic-card-description">{topic.description}</span>
                  : <span data-test-id="topic-card-no-description">({t('topics:props.noDescription')})</span>
              }
            </Card.Description>
          </Card.Content>
          <Card.Content extra={true}>
            <div className="ui two buttons">
              <Button
                primary={true}
                icon={true}
                labelPosition="left"
                as={Link}
                to={makeRoute(TOPIC_EDITOR_ROUTE, { topicId: topic.id })}
              >
                <Icon name="pencil" />
                Edit
              </Button>
              <Button
                onClick={this.showRemoveModal}
                icon={true}
                labelPosition="left"
                data-test-id="topic-card-remove-button"
              >
                <Icon name="trash" />
                {t('common:button.delete')}
              </Button>
            </div>
          </Card.Content>
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

const TopicCard = connect(null, mapDispatchToProps)(translate()(PureTopicCard));

export { PureTopicCard };
export default TopicCard;
