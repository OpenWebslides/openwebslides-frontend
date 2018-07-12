// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Card, Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { translate, type TranslatorProps } from 'react-i18next';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import ObjectNotFoundError from 'errors/usage-errors/ObjectNotFoundError';

import { getById } from '../selectors';
import type { Topic } from '../model';
import { remove } from '../actions';

type PassedProps = {|
  topicId: Identifier,
|};

type StateProps = {|
  topic: Topic,
|};

type DispatchProps = {|
  onRemoveButtonClick: (string) => void,
|};

type Props = {|
  ...TranslatorProps,
  ...PassedProps,
  ...StateProps,
  ...DispatchProps,
|};

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  const { topicId } = props;
  const topic = getById(state, { id: topicId });

  if (topic == null) {
    throw new ObjectNotFoundError('topics:topic', props.topicId);
  }

  return {
    topic,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => {
  return {
    onRemoveButtonClick: (id: string): void => {
      dispatch(
        remove(id),
      );
    },
  };
};

type LocalState = {
  open: boolean,
};

class PureTopicCard extends React.Component<Props, LocalState> {
  state: LocalState = {
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
          <Card.Content header={topic.title} description={topic.description || `(${t('topics:noDescription')})`} />
          <Card.Content extra={true}>
            <Link to={{
              pathname: `/editor/${topicId}`,
            }}
            >
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
