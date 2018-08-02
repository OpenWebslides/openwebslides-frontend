// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';
import { Card, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { translate, type TranslatorProps } from 'react-i18next';

import { type State } from 'types/state';
import { type Action } from 'types/action';
import { TOPIC_EDITOR_ROUTE } from 'config/routes';
import { ObjectNotFoundError } from 'errors';

import actions from '../../../actions';
import * as m from '../../../model';
import selectors from '../../../selectors';

type PassedProps = {|
  topicId: string,
|};

type StateProps = {|
  topic: m.Topic,
|};

type DispatchProps = {|
  onRemoveButtonClick: (string) => void,
|};

type Props = {| ...TranslatorProps, ...PassedProps, ...StateProps, ...DispatchProps |};

type ComponentState = {|
  open: boolean,
|};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { topicId } = props;
  const topic = selectors.getById(state, { id: topicId });

  if (topic == null) {
    throw new ObjectNotFoundError('topics:topic', props.topicId);
  }

  return {
    topic,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): DispatchProps => {
  return {
    onRemoveButtonClick: (id: string): void => {
      dispatch(actions.remove(id));
    },
  };
};

// #TODO fetch topic if not in state yet
class PureTopicCard extends React.Component<Props, ComponentState> {
  state: ComponentState = {
    open: false,
  };

  show = (): void => {
    this.setState({ open: true });
  };

  no = (): void => {
    this.setState({ open: false });
  };

  yes = (): void => {
    const { topic, onRemoveButtonClick } = this.props;
    this.setState({ open: false });
    onRemoveButtonClick(topic.id);
  };

  render = (): React.Node => {
    const { open } = this.state;
    const {
      t,
      topic,
    } = this.props;

    const topicId = topic.id;

    return (
      <React.Fragment>
        <Card raised={true}>
          <Card.Content
            header={topic.title}
            description={(topic.description != null) ? topic.description : `(${t('topics:noDescription')})`}
          />
          <Card.Content extra={true}>
            <Link to={`${TOPIC_EDITOR_ROUTE}/${topicId}`}>
              <Button as="span" primary={true}>
                Edit
              </Button>
            </Link>

            <Button
              as="span"
              secondary={true}
              floated="right"
              onClick={this.show}
            >
              {t('common:button.delete')}
            </Button>
          </Card.Content>
        </Card>
        <Modal size="tiny" open={open} onClose={this.no}>
          <Modal.Header>
            Delete this topic
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this topic?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button secondary={true} onClick={this.no}>
            Cancel
            </Button>
            <Button primary={true} icon="trash" labelPosition="left" content="Delete" onClick={this.yes} />
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  };
}

const TopicCard = connect(mapStateToProps, mapDispatchToProps)(translate()(PureTopicCard));

export { PureTopicCard };
export default TopicCard;