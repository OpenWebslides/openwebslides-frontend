// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { Card, Button, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import type { State } from 'types/state';
import type { Identifier } from 'types/model';
import { translate } from 'react-i18next';
import type { TranslatorProps } from 'react-i18next';

import { getById } from '../selectors';
import type { Topic } from '../model';
import { remove } from '../actions';

type PassedProps = {
  topicId: Identifier,
};

type StateProps = {
  topic: Topic,
};

type DispatchProps = {
  onRemoveButtonClick: (string) => void,
};

type Props = TranslatorProps & PassedProps & StateProps & DispatchProps;

const mapStateToProps = (state: State, props: PassedProps): StateProps => {
  return {
    topic: getById(state, props.topicId),
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

const PureTopicCard = (props: Props): React.Node => {
  const {
    t,
    topic,
    onRemoveButtonClick,
  } = props;

  const topicId = topic.id;

  return (
    <Card raised={true}>
      <Card.Content header={topic.title} />
      <Card.Content description={topic.description} />
      <Card.Content>
        <Grid divided={true} columns={3}>
          <Grid.Column>
            <Image src="/assets/images/icons/fork.png" />
            1
          </Grid.Column>
          <Grid.Column>
            <Image src="/assets/images/icons/merge.png" />
            0

          </Grid.Column>
          <Grid.Column>
            <Image src="/assets/images/icons/annotations.png" />
            3
          </Grid.Column>
        </Grid>
      </Card.Content>
      <Card.Content>
        <Button as="span">
          <Link to={{
            pathname: `/editor/${topicId}`,
          }}
          >
            Edit
          </Link>
        </Button>

        <Button as="span" basic={true} color="red" floated="right" onClick={() => onRemoveButtonClick(topicId)}>
          {t('common:button.remove')}
        </Button>
      </Card.Content>
    </Card>
  );
};

const TopicCard = connect(mapStateToProps, mapDispatchToProps)(translate()(PureTopicCard));

export { PureTopicCard };
export default TopicCard;
